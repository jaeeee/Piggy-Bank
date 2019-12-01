import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import { db } from "./config/firebase";
import fire from "./config/firebase";

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
          expenses:[],
        //for the line and pie charts
        lineData:{
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

          ]
        },

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
                    console.log(currentComp.state.expenses)
                    found = 1
                  }
                  catch(error){
                    console.log("We getting an error: ", error)
                    found = 0
                  }

                })

          if (found == 1) {
            currentComp.setState({
              expenses: tempExpense
            });
            console.log(tempExpense)
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

        return(
            <div>
            <Line
                  data={this.state.lineData}
                  width={500}
                  height={200}
                  options={{
                    responsive: true,

                   title:{
                     display:true,
                     text:"Monthly Spending History" ,
                     fontSize: 20
                   },
                   legend:{
                     display:true,
                     position:'top'
                   },
                   layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 10
                    }
                   },
                  }}
              />
            </div>


        );
    }

}

export default LineGraph;
