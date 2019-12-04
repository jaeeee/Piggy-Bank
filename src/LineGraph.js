import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2'
import { db } from "./config/firebase";
import fire from "./config/firebase";
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { array } from "prop-types";


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

//want to show balance taken from database after being set
let fourSpent = 200, threeSpent = 320, twoSpent = 50, oneSpent = 70, currSpent = 0;  //use spending from spending log

class LineGraph extends Component{





    constructor(props){



        let currDate = new Date();      //date is based on UTC timezone, change to user's timezone
        let lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate()-7);
        let twoWeeks = new Date();
        twoWeeks.setDate(twoWeeks.getDate()-14);
        let threeWeeks = new Date();
        threeWeeks.setDate(threeWeeks.getDate()-21);
        let fourWeeks = new Date();
        fourWeeks.setDate(fourWeeks.getDate()-28);



        super(props);

        //everything under is for the wallet balance input except chartData
        this.state = { value: '', pastInput: 1, decimal: false,
          expenses:[], monthCat: {}, monthList: [], currMonth: "2019-12",
          currMonthIndex: 0, count: 0, noDups: [],
        //for the line and pie charts
        graphData:[{
          labels: [
            (fourWeeks.getUTCMonth() + 1) + '/' + fourWeeks.getUTCDate(),
            (threeWeeks.getUTCMonth() + 1) + '/' + threeWeeks.getUTCDate(),
            (twoWeeks.getUTCMonth() + 1) + '/' + twoWeeks.getUTCDate(),
            (lastWeek.getUTCMonth() + 1) + '/' + lastWeek.getUTCDate(),
            (currDate.getUTCMonth() + 1) + '/' + currDate.getUTCDate()
          ],
          datasets:[
            {
              label: 'Spent',
              data:[
                fourSpent,
                threeSpent,
                twoSpent,
                oneSpent,
                currSpent,
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
                fourSpent,
                threeSpent,
                twoSpent,
                oneSpent,
                currSpent,
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
            (fourWeeks.getUTCMonth() + 1) + '/' + fourWeeks.getUTCDate(),
            (threeWeeks.getUTCMonth() + 1) + '/' + threeWeeks.getUTCDate(),
            (twoWeeks.getUTCMonth() + 1) + '/' + twoWeeks.getUTCDate(),
            (lastWeek.getUTCMonth() + 1) + '/' + lastWeek.getUTCDate(),
            (currDate.getUTCMonth() + 1) + '/' + currDate.getUTCDate()
          ],
        }
      ],

    };


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



  }
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
  handleChangeSelect = ({ target }) => {
    this.setState({
      currMonth: target.value
    })

    let index = this.state.monthList.indexOf(this.state.currMonth);

    if(index != -1){
      this.setLineGraphData(index);
      this.setDoughnutGraphData(index);
    }

  };


  splitByMonth = () => {
      let tempMonthCatArr = [];
      for(let i = 0; i < this.state.expenses.length; i++){
        let currMonthCat = this.state.expenses[i].date.substr(0,7);
        if(!(currMonthCat in this.state.monthCat)){
          this.state.monthCat[currMonthCat] = [this.state.expenses[i]];
          this.state.monthList.push(currMonthCat);
        }
        else{
            this.state.monthCat[currMonthCat].push(this.state.expenses[i]);
        }
        console.log(this.state.monthCat);
        console.log(this.state.monthList);
      }

      return;

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

  sortDates = (arrSpent, arrDate) => {

    for(let i = 0; i < arrDate.length - 1; i++){
      for(let j = i+1; j < arrDate.length; j++){
        if(parseInt(arrDate[j].substr(3,4)) < parseInt(arrDate[i].substr(3,4))){
          let temp = arrDate[j];
          arrDate[j] = arrDate[i];
          arrDate[i] = temp;

          temp = arrSpent[j];
          arrSpent[j] = arrSpent[i];
          arrSpent[i] = temp;
        }
      }
    }
    console.log(arrSpent);
    console.log(arrDate);

    this.state.graphData[0].labels = arrDate;
    this.state.graphData[0].datasets[0].data = arrSpent;
  }

  checkDuplicatesLine = (tempMonthCat) => {
    let arr = [];
    for(let i = 0; i < tempMonthCat.length; i++){
      let found = false;
      for(let j = 0; j < i; j++){
        if(tempMonthCat[i].amount == tempMonthCat[j].amount && tempMonthCat[i].name == tempMonthCat[j].name){
          found = true;
          break;
        }
      }
      if(!(found)){
        arr.push(tempMonthCat[i]);
      }

    }
    this.state.noDups = arr;
    console.log(this.state.noDups);
  }

  setLineGraphData = (monthInd) => {
    let tempMonthCat = this.state.monthCat[this.state.monthList[monthInd]];
    this.checkDuplicatesLine(tempMonthCat);
    tempMonthCat = this.state.noDups;
    console.log(tempMonthCat);
    let arrSpent = []
    let arrDate = []
    for(let i = 0; i < tempMonthCat.length; i++){
      let currSpent = parseFloat(tempMonthCat[i].amount);
      let rawDate =  tempMonthCat[i].date;
      let currDate = rawDate.charAt(5) + rawDate.charAt(6) + "/" + rawDate.charAt(8) + rawDate.charAt(9);
      let sameDate = arrDate.indexOf(currDate);


      //console.log("yes")
      //console.log(temp)
      if(sameDate != -1){
        arrSpent[sameDate] = arrSpent[sameDate] + currSpent;
        arrSpent[sameDate] = parseFloat(arrSpent[sameDate].toPrecision(4));
        //console.log("Going through at index: ", temp)
      }

      else{
        arrSpent.push(currSpent);
        arrDate.push(currDate); // for LineGraph Dates
      }
    }
    console.log(arrSpent);
    console.log(arrDate);

    this.sortDates(arrSpent,arrDate);

    //console.log("stateData: ", this.state.lineData.datasets[0].data)

  }




  setDoughnutGraphData = (monthInd) =>{
    let tempMonthCat = this.state.monthCat[this.state.monthList[monthInd]];
    this.checkDuplicatesLine(tempMonthCat);
    tempMonthCat = this.state.noDups;
    let arrSpent = [];
    let arrCategory = [];
    let arrColor = [];
    for(let i = 0; i < tempMonthCat.length; i++){
      let currSpent = parseFloat(tempMonthCat[i].amount);
      let currCategory = tempMonthCat[i].category;
      let sameCategory = arrCategory.indexOf(currCategory);

      if(sameCategory != -1){
        arrSpent[sameCategory] = arrSpent[sameCategory] + currSpent;
        arrSpent[sameCategory] = parseFloat(arrSpent[sameCategory].toPrecision(4));
        //console.log("Going through at index: ", temp)
      }

      else{
        arrSpent.push(currSpent);
        arrCategory.push(currCategory); // for PieGraph Sections
        let currColor = this.selectColor(arrColor.length);
        arrColor.push(currColor);
      }
    }
    //console.log(arrSpent);
    //console.log(arrDate);
    this.state.graphData[1].labels = arrCategory;
    this.state.graphData[1].datasets[0].data = arrSpent;
    //console.log(arrColor) //Add back after testing
    this.state.graphData[1].datasets[0].backgroundColor = arrColor;
  }

  componentDidMount() {

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
                    console.log(currentComp.state.expenses);
                    console.log("Going through userRef snapshot");

                    currentComp.splitByMonth()
                    return;

                    //currentComp.setLineGraphData(0);
                    //currentComp.setDoughnutGraphData(0);

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



    render(){

        return (
          <div>
            <Router>
              {/* <MDBContainer>
              <MDBCard>
                <MDBCardBody> */}
              {/* <h3>Your Statistics</h3> */}
              <div>
                <FormControl>
                  <form>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.currMonth}
                      onChange={this.handleChangeSelect}
                    >
                      {this.state.monthList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <MDBBtn color="success" type="button">load data</MDBBtn> */}
                    <br></br>
                    <MDBBtn color="primary" type="button" onClick={this.handleChangeSelect}>load data</MDBBtn>
                  </form>
                  <br></br>
                </FormControl>
                <Line
                  data={this.state.graphData[0]}
                  width={500}
                  height={200}
                  options={{
                    responsive: true,

                    title: {
                      display: true,
                      text: "Monthly Spending History Per Day",
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
              <div>
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
              {/* </MDBCardBody>
              </MDBCard>
            </MDBContainer> */}
            </Router>
          </div>
        );
    }

}

export default withRouter(LineGraph);
