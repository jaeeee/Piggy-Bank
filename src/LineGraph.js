import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2'
import { db } from "./config/firebase";
import fire from "./config/firebase";
import { withRouter } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import {BrowserRouter as Router} from "react-router-dom";

let arrSpentLine = []
let arrDateLine = []
let arrSpentDoughnut = []
let arrCategoryDoughnut = []
let arrColor = []
let updater = 1

class LineGraph extends Component{


  componentWillMount() {
    let currentComp = this;

    fire.auth().onAuthStateChanged(function(user) {
      if(user){
        var tempExpense = [];
        var found = 0;
        var userRef = db.collection("users").doc(fire.auth().currentUser.email);
        var username = fire.auth().currentUser.email;

        userRef.onSnapshot({
            // Listen for document metadata changes
            includeMetadataChanges: true
        }, function(doc) {
                  try{
                    currentComp.setState({
                      expenses: doc.data().expenses
                    });
                    console.log(currentComp.state.expenses)
                    console.log("Going through userRef snapshot")

                    currentComp.setLineGraphData();
                    currentComp.setDoughnutGraphData();

                  }
                  catch(error){
                    console.log("We getting an error: ", error)// ADD back later
                    found = 0
                  }

                })

          if (found == 1) {
            //console.log("does hit this")
          }
          else{
            currentComp.setState({
              expenses: ["None"]
            });
          }


      }



    });
   
  };
  // componentDidUpdate(prevProps, prevState) {
  //   // only update chart if the data has changed
  //   if (prevProps.arrSpentLine !== this.props.arrSpentLine) {
  //     this.state.graphData[0].datasets[0].data = arrSpentLine.load({
  //       arrSpentLine: this.state.graphData[0].datasets[0].data
  //     });
  //   }
  // }
 
  setLineGraphData = () => {
    for(let i = 0; i < this.state.expenses.length; i++){
      let currSpent = parseFloat(this.state.expenses[i].amount);
      let rawDate = this.state.expenses[i].date;
      let currDate = rawDate.charAt(5) + rawDate.charAt(6) + "/" + rawDate.charAt(8) + rawDate.charAt(9);
      let sameDate = arrDateLine.indexOf(currDate);
      //console.log("yes")
      //console.log(temp)
      if(sameDate != -1){
        let found = 1;
        //check if date = prev date and if yes do samedate + curspent else do just currspent
        for(let j = i-1; j >= 0; j--){
          let prevRawDate = this.state.expenses[j].date;
          let currDate2 = prevRawDate.charAt(5) + prevRawDate.charAt(6) + "/" + prevRawDate.charAt(8) + prevRawDate.charAt(9);
          let prevDate = arrDateLine.indexOf(currDate2);
          if(sameDate == prevDate){ //we have seen this date before
            arrSpentLine[sameDate] += currSpent;
            found = 0;
            break;
          }
        }
        if(found){
          arrSpentLine[sameDate] = currSpent;
        }
        arrSpentLine[sameDate] = parseFloat(arrSpentLine[sameDate].toPrecision(4));
        //console.log("Going through at index: ", temp)
      }

      else{
        arrSpentLine.push(currSpent);
        arrDateLine.push(currDate); // for LineGraph Dates
      }
    }

    //console.log(arrSpent);
    //console.log(arrDate);
    this.state.graphData[0].labels = arrDateLine;
    this.state.graphData[0].datasets[0].data = arrSpentLine;
    //console.log("stateData: ", this.state.lineData.datasets[0].data)
    
  }

  selectColor = (colorInd) => {
    let arr = ['rgba(255, 0, 0, .75)', 'rgba(255, 128, 0, .75)', 'rgba(255, 255, 0, .75)',
    'rgba(128, 255, 0, .75)', 'rgba(0, 255, 0, .75)', 'rgba(0, 255, 128, .75)',
    'rgba(0, 255, 255, .75)', 'rgba(0, 128, 255, .75)', 'rgba(0, 0, 255, .75)',
    'rgba(127, 0, 255, .75)', 'rgba(255, 0, 255, .75)', 'rgba(255, 0, 127, .75)',
    'rgba(128, 128, 128, .75)', 'rgba(223, 223, 223, .75)', 'rgba(25, 25, 25, .75)',
  ]

  return (arr[colorInd])

}

  setDoughnutGraphData = () =>{
    //let arrSpent = []
    //let arrCategory = []
    //let arrColor = []
    for(let i = 0; i < this.state.expenses.length; i++){
      let currSpent = parseFloat(this.state.expenses[i].amount);
      let currCategory = this.state.expenses[i].category;
      let sameCategory = arrCategoryDoughnut.indexOf(currCategory);

      if(sameCategory != -1){
        let found = 1;
        //check if date = prev date and if yes do samedate + curspent else do just currspent
        for(let j = i-1; j >= 0; j--){
          let currCategory2 = this.state.expenses[j].category;
          let prevCategory = arrCategoryDoughnut.indexOf(currCategory2);
          if(sameCategory == prevCategory){ //we have seen this date before
            arrSpentLine[sameCategory] += currSpent;
            found = 0;
            break;
          }
        }
        if(found){
          arrSpentDoughnut[sameCategory] = currSpent;
        }
        arrSpentDoughnut[sameCategory] = parseFloat(arrSpentDoughnut[sameCategory].toPrecision(4));
        //console.log("Going through at index: ", temp)
      }

      else{
        arrSpentDoughnut.push(currSpent);
        arrCategoryDoughnut.push(currCategory); // for PieGraph Sections
        let currColor = this.selectColor(arrColor.length);
        arrColor.push(currColor);
      }
    }
    //console.log(arrSpent);
    //console.log(arrDate);
    this.state.graphData[1].labels = arrCategoryDoughnut;
    this.state.graphData[1].datasets[0].data = arrSpentDoughnut;
    //console.log(arrColor) //Add back after testing
    this.state.graphData[1].datasets[0].backgroundColor = arrColor;
  } 


    constructor(props){
    //   super(props);
    //   this.state = {
    //     graphData:[{
    //       labels:[
            
    //        //arrDateLine
    //       ],
    //       datasets:[
    //         {
    //           label: 'Spent',
    //           data:[
    //             //arrSpentLine
    //           ],
    //           backgroundColor:[
    //             'rgba(224, 54, 20, 0.2)'
    //           ],
    //           borderColor: [
    //             'rgba(224, 54, 20,1)'
    //           ],
    //         },

    //       ],
          

          
          
    //     },
    //     // {
    //     //   graphData:[{
    //     //     labels:[
              
    //     //      //arrDateLine
    //     //     ],
    //     //     datasets:[
    //     //       {
    //     //         label: 'Spent',
    //     //         data:[
    //     //           //arrSpentLine
    //     //         ],
    //     //         backgroundColor:[
    //     //           'rgba(224, 54, 20, 0.2)'
    //     //         ],
    //     //         borderColor: [
    //     //           'rgba(224, 54, 20,1)'
    //     //         ],
    //     //       },
  
    //     //     ],
            
  
            
            
    //     //   },
    //     // ]
    //     // }
    //   ],
    //   }

    // }
       

        // let currDate = new Date();      //date is based on UTC timezone, change to user's timezone
        // let lastWeek = new Date();
        // lastWeek.setDate(lastWeek.getDate()-7);
        // let twoWeeks = new Date();
        // twoWeeks.setDate(twoWeeks.getDate()-14);
        // let threeWeeks = new Date();
        // threeWeeks.setDate(threeWeeks.getDate()-21);
        // let fourWeeks = new Date();
        // fourWeeks.setDate(fourWeeks.getDate()-28);



        super(props);

        this.state = {
          
        //for the line and pie charts
        graphData:[{ 
          labels: [
            arrDateLine,
            // (fourWeeks.getUTCMonth() + 1) + '/' + fourWeeks.getUTCDate(),
            // (threeWeeks.getUTCMonth() + 1) + '/' + threeWeeks.getUTCDate(),
            // (twoWeeks.getUTCMonth() + 1) + '/' + twoWeeks.getUTCDate(),
            // (lastWeek.getUTCMonth() + 1) + '/' + lastWeek.getUTCDate(),
            // (currDate.getUTCMonth() + 1) + '/' + currDate.getUTCDate()
          ],
          datasets:[
            {
              label: 'Spent',
              data:[
               arrSpentLine
              ],
              backgroundColor:[
                'rgba(224, 54, 20, 0.2)'
              ],
              borderColor: [
                'rgba(224, 54, 20,1)'
              ],
            },

          ],
        },
        {
          datasets:[
            {
              data:[
                // fourSpent,
                // threeSpent,
                // twoSpent,
                // oneSpent,
                // currSpent,
              ],
              backgroundColor:[
                'rgba(255, 0, 0, .75)'
              ],
              borderColor: [
                '#fff'
              ],
            },

          ],
          labels: [
            // (fourWeeks.getUTCMonth() + 1) + '/' + fourWeeks.getUTCDate(),
            // (threeWeeks.getUTCMonth() + 1) + '/' + threeWeeks.getUTCDate(),
            // (twoWeeks.getUTCMonth() + 1) + '/' + twoWeeks.getUTCDate(),
            // (lastWeek.getUTCMonth() + 1) + '/' + lastWeek.getUTCDate(),
            // (currDate.getUTCMonth() + 1) + '/' + currDate.getUTCDate()
          ],
        }
      ],

    };
  }

    /*var tempExpense = [];
    var found = 0;
    var userRef = db.collection("users").doc(fire.auth().currentUser.email)
    .catch(function(error){
      console.log("We getting an error: ", error)
      userRef = db.collection("users").doc(" ")
    })


    userRef.onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    }, function(doc) {
      this.setState({
        expenses: doc.data().expenses
      })
      .then(function(){
        console.log(this.state.expenses)
      })
      .catch(function(error){
        console.log("We getting an error: ", error)
        this.setState({
          expenses: []
        })
      });
    })*/

  /*componentDidMount() {
    var categories_copy = [];
    var spending_copy = [];
    var found = 0;
    fire
      .firestore()
      .collection("sample_data")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          if (doc.id == fire.auth().currentUser.email) {
            spending_copy.spending = doc.data().spending;
            categories_copy.cat = doc.data().cats;
            found = 1;
            return;
          }
        });
        if (found == 0) {
          this.setState({
            expenses: []
          });
        } else
          this.setState({
            expenses: []
          });
      })
      .catch(function(error) {
        console.log("Error fetching data: ", error);
      });
    // this.testingLOL();
  }*/

  /*hslToRgb(h, s, l) { // convert hsl values to RGB
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [ r * 255, g * 255, b * 255 ];
  }*/


  // selectColor = (colorInd) => {
  //     let arr = ['rgba(255, 0, 0, .75)', 'rgba(255, 128, 0, .75)', 'rgba(255, 255, 0, .75)',
  //     'rgba(128, 255, 0, .75)', 'rgba(0, 255, 0, .75)', 'rgba(0, 255, 128, .75)',
  //     'rgba(0, 255, 255, .75)', 'rgba(0, 128, 255, .75)', 'rgba(0, 0, 255, .75)',
  //     'rgba(127, 0, 255, .75)', 'rgba(255, 0, 255, .75)', 'rgba(255, 0, 127, .75)',
  //     'rgba(128, 128, 128, .75)', 'rgba(223, 223, 223, .75)', 'rgba(25, 25, 25, .75)',
  //   ]

  //   return (arr[colorInd])

  // }


  // setLineGraphData = () => {
  //   let arrSpent = []
  //   let arrDate = []
  //   for(let i = 0; i < this.state.expenses.length; i++){
  //     let currSpent = parseFloat(this.state.expenses[i].amount);
  //     let rawDate = this.state.expenses[i].date;
  //     let currDate = rawDate.charAt(5) + rawDate.charAt(6) + "/" + rawDate.charAt(8) + rawDate.charAt(9);
  //     let sameDate = arrDate.indexOf(currDate);
  //     //console.log("yes")
  //     //console.log(temp)
  //     if(sameDate != -1){
  //       arrSpent[sameDate] = arrSpent[sameDate] + currSpent;
  //       arrSpent[sameDate] = parseFloat(arrSpent[sameDate].toPrecision(4));
  //       //console.log("Going through at index: ", temp)
  //     }

  //     else{
  //       arrSpent.push(currSpent);
  //       arrDate.push(currDate); // for LineGraph Dates
  //     }
  //   }
  //   //console.log(arrSpent);
  //   //console.log(arrDate);
  //   this.state.graphData[0].labels = arrDate;
  //   this.state.graphData[0].datasets[0].data = arrSpent;
  //   //console.log("stateData: ", this.state.lineData.datasets[0].data)

  // }


  // setDoughnutGraphData = () =>{
  //   let arrSpent = []
  //   let arrCategory = []
  //   let arrColor = []
  //   for(let i = 0; i < this.state.expenses.length; i++){
  //     let currSpent = parseFloat(this.state.expenses[i].amount);
  //     let currCategory = this.state.expenses[i].category;
  //     let sameCategory = arrCategory.indexOf(currCategory);

  //     if(sameCategory != -1){
  //       arrSpent[sameCategory] = arrSpent[sameCategory] + currSpent;
  //       arrSpent[sameCategory] = parseFloat(arrSpent[sameCategory].toPrecision(4));
  //       //console.log("Going through at index: ", temp)
  //     }

  //     else{
  //       arrSpent.push(currSpent);
  //       arrCategory.push(currCategory); // for PieGraph Sections
  //       let currColor = this.selectColor(arrColor.length);
  //       arrColor.push(currColor);
  //     }
  //   }
  //   //console.log(arrSpent);
  //   //console.log(arrDate);
  //   this.state.graphData[1].labels = arrCategory;
  //   this.state.graphData[1].datasets[0].data = arrSpent;
  //   //console.log(arrColor) //Add back after testing
  //   this.state.graphData[1].datasets[0].backgroundColor = arrColor;
  // }



    render(){
        return (
          <div>
           
            <Router>
            <MDBContainer>
              <MDBCard>
                <MDBCardBody>
                  <h3>Your Statistics</h3>
                  <div /*{...this.state.graphData[0].labels = arrDateLine}{...this.state.graphData[0].datasets[0].data = arrSpentLine}*//>
                  <Line
                    data={this.state.graphData[0]}
                    width={500}
                    height={200}
                    options={{
                      responsive: true,

                      title: {
                        display: true,
                        text: "Monthly Spending History",
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: "top"
                      },
                      layout: {
                        padding: {
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 10
                        }
                      }
                    }}
                  />
              
                  <div /*{...this.state.graphData[1].labels = arrCategoryDoughnut}{...this.state.graphData[1].datasets[0].data = arrSpentDoughnut}
                  {...this.state.graphData[1].datasets[0].backgroundColor = arrColor}*/>
                    <Doughnut
                      data={this.state.graphData[1]}
                      width={100}
                      height={350}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,

                        title: {
                          display: true,
                          text: "Monthly Spending History Per Category",
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: "top"
                        },
                        layout: {
                          padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 10
                          }
                        }
                      }}
                    />
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
            </Router>
          </div>
        );
    }

}

export default withRouter(LineGraph);
