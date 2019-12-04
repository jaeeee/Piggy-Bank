import React, { Component } from "react";

import { db } from "./config/firebase";
import fire from "./config/firebase";

export class Budget extends Component {
  constructor() {
    super();
    this.state = {
      budget: "",
      display_budget: "",
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

    let userRef = db
      .collection("users")
      .doc(fire.auth().currentUser.email);

    //   console.log(tempname);
    userRef.update({
      budget: this.state.budget
    });
    this.setState({
      budget: ""
    });
    // console.log("Set budget is complete");
  };

  componentDidMount() {
    // fire.auth().updateCurrentUser();
        // var name_fromdb = fire.auth().currentUser.email;
        // this.setState({
          // name: name_fromdb
        // });
            // console.log(name_fromdb);
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

  render() {
    return (
      <div>
        <p>{this.state.display_budget}</p>
        <form onSubmit={this.setBudget}>
          <div class="mdl-textfield mdl-js-textfield">
            <input
              class="mdl-textfield__input"
              type="number"
              step = ".01"
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
    //  }
  }

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
        Current budget: <b>${this.state.display_budget}</b>
        <form onSubmit={this.setBudget}>
          <div class="mdl-textfield mdl-js-textfield">
            <input
              class="mdl-textfield__input"
              onKeyPress={this.onKeyPress.bind(this)} 
              type="number"
              //min = "0"
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