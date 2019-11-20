import React, { Component } from "react";

import { db } from "./config/firebase";
import fire from "./config/firebase";

export class Budget extends Component {
  constructor() {
    super();
    this.state = {
      budget: '',
      display_budget: ''
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
    db.settings({
      timestampsInSnapshots: true
    });

    let userRef = db
      .collection("sample_data")
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



  render() {
    return (
      <div>
        Current budget:
        <form onSubmit={this.setBudget}>
          <div class="mdl-textfield mdl-js-textfield">
            <input
              class="mdl-textfield__input"
              type="number"
              name="budget"
              placeholder="Set your budget"
              onChange={this.updateInput}
              value={this.state.budget}
            />
          </div>
          <br></br>
          {/* <input type="email" name="email" placeholder="Full name" /> */}
          <button
            class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored  "
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default Budget;
