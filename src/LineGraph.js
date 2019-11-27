import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import { db } from "./config/firebase";
import fire from "./config/firebase";

//want to show balance taken from database after being set
let fourSpent = 200, threeSpent = 320, twoSpent = 50, oneSpent = 70, currSpent = 0;  //use spending from spending log

class LineGraph extends Component{

    /*componentDidMount() {
        fire
          .firestore()
          .collection("sample_data")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
              if (doc.id == fire.auth().currentUser.email) {
                  //loops through array of expensive looking for dates and adding to amounts
                  //need to parse the date since its not same format as Date().getDate()
                for(let i = doc.data().Expenses.date.length()-1; i <= 0; i--){
                    if(doc.data().Expenses[i][3] >= Date().getDate()-28 && doc.data().Expenses.date[i] < Date().getDate()-21){
                        fourSpent += doc.data().Epenses.Amount[i];
                    }
                    if(doc.data().Expenses.date[i] >= Date().getDate()-21 && doc.data().Expenses.date[i] < Date().getDate()-14){
                        threeSpent += doc.data().Epenses.Amount[i];
                    }
                    if(doc.data().Expenses.date[i] >= Date().getDate()-14 && doc.data().Expenses.date[i] < Date().getDate()-7){
                        twoSpent += doc.data().Epenses.Amount[i];
                    }
                    if(doc.data().Expenses.date[i] >= Date().getDate()-7 && doc.data().Expenses.date[i] < Date().getDate()){
                        oneSpent += doc.data().Epenses.Amount[i];
                    }
                    if( doc.data().Expenses.date[i] == Date().getDate()){
                        currSpent += doc.data().Epenses.Amount[i];
                    }

                }
              }
            });
          })
    
          .catch(function(error) {
            // alert("Error fetching user data");
            console.log("Error fetching data: ", error);
          });
      }*/

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

   
    }
  

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