import React, { Component } from "react";

import { db } from "./config/firebase";
import fire from "./config/firebase";

export class Budget extends Component {
  constructor() {
    super();
    this.state = {
      budget: "",
      currbudget: "0",
      display_budget: "",
      expenses: [],
      name: ""
    };
  }

  /**
   * Updates state of input
   */
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**
   * Updates budget in firestore
   */
  setBudget = e => {
    e.preventDefault();
    //   const db = f.firestore();
    // db.settings({
    //   // timestampsInSnapshots: true
    // });
    let tempBudget = this.state.budget;
    let userRef = db.collection("users").doc(fire.auth().currentUser.email);

    userRef.update({
        budget: tempBudget
    })
    .then(function(){
      console.log("updating DB")
    })
    .catch(function(error){
      console.log("Error caused by no doc existing for db. Creating new categories: ", error)
      userRef.set({
            budget: tempBudget
        }, { merge: true })
        .catch(function(error){
          console.log("Somethings really wrong: ", error)
        });
    });

    this.setState({
      budget: ""
    });
    // if (this.state.currbudget < 0) {
    //   alert("You are under budget, be careful!");
    // } else {
    //   // do nothing
    // }
    // console.log("Set budget is complete");
  };

  splitByMonth = () => {
    console.log(this.state.expenses);
    let date = new Date();
    let todayMonthYear = date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1).toString();
    console.log(todayMonthYear);
    let totalMonthExpenses = 0;

    for(let i = 0; i < this.state.expenses.length; i++){
      let currMonthCat = this.state.expenses[i].date.substr(0,7);
      if(todayMonthYear == currMonthCat){
        totalMonthExpenses = totalMonthExpenses + parseFloat(this.state.expenses[i].amount)
      }
    let yes = (parseFloat(this.state.display_budget) - totalMonthExpenses).toString();
    console.log(yes);
    console.log(this.state.display_budget);
    console.log(totalMonthExpenses);
    this.setState({
      currbudget: yes
    })
    }
  }

  componentDidMount() {
            let currentComp = this;

            fire.auth().onAuthStateChanged(function(user) {
              if(user){
                var found = 0;
                var userRef = db.collection("users").doc(fire.auth().currentUser.email);
                var username = fire.auth().currentUser.email;

                userRef.onSnapshot({
                    // Listen for document metadata changes
                    includeMetadataChanges: true
                }, function(doc) {
                          try{
                            currentComp.setState({
                              display_budget: doc.data().budget,
                              expenses: doc.data().expenses
                            });
                            currentComp.splitByMonth()
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
                      display_budget: "None",
                      expenses: ["None"]
                    });
                  }
                }
              });
  }

  // render() {
  //   return (
  //     <div>
  //       <p>{this.state.display_budget}</p>
  //       <form onSubmit={this.setBudget}>
  //         <div class="mdl-textfield mdl-js-textfield">
  //           <input
  //             class="mdl-textfield__input"
  //             type="number"
  //             step = ".01"
  //             name="budget"
  //             placeholder="Set your budget"
  //             onChange={this.updateInput}
  //             value={this.state.budget}
  //             required
  //           />
  //         </div>
  //         <button
  //           class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored  "
  //           type="submit"
  //         >
  //           Save
  //         </button>
  //         <br></br>
  //         {/* <input type="email" name="email" placeholder="Full name" /> */}
  //       </form>
  //     </div>
  //   );
  //   //  }
  // }

  componentDidUpdate() {
    var budget_copy = 0;
    var found = 0;
    fire
      .firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          if (doc.id == fire.auth().currentUser.email) {
            budget_copy = doc.data().budget;
            found = 1;
          }
        });
        if (found == 0) {
          this.setState({
            display_budget: "undefined"
          });
        } else
          this.setState({
            display_budget: budget_copy
          });
      })

      .catch(function(error) {
        // alert("Error fetching user data");
        console.log("Error fetching data: ", error);
      });
  }

  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue))
      event.preventDefault();
  }

  render() {
    return (
      <div>
        {/* Welcome back {this.state.name} <br></br> */}
        Total Budget for this month: <b>${this.state.display_budget}</b>
        <br />
        Remaining Budget After Expenses:{" "}
        <b>
          {this.state.currbudget < 0 ? (
            <font color="red">${this.state.currbudget}</font>
          ) : (
            <font color="green">${this.state.currbudget}</font>
          )}
        </b>
        <br></br>
        <b>
          {this.state.currbudget < 0 ? (
            <font color="red">You are under budget, try to re-evaluate your spending.</font>
          ) : (
            <font color="green">You are within budget, keep it up!</font>
          )}
        </b>
        <br></br>
        <form onSubmit={this.setBudget}>
          <div class="mdl-textfield mdl-js-textfield">
            <input
              class="mdl-textfield__input"
              onKeyPress={this.onKeyPress.bind(this)}
              type="number"
              min="0"
              max="999999"
              step=".01"
              name="budget"
              placeholder="Set your budget"
              onChange={this.updateInput}
              value={this.state.budget}
              required
            />
          </div>
          <button
            class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored  "
            type="submit"
          >
            Save
          </button>
          <br></br>
          {/* <input type="email" name="email" placeholder="Full name" /> */}
        </form>
      </div>
    );
  }
}

export default Budget;
