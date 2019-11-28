import React, { Component } from "react";
import fire from "./config/firebase";
import { db } from "./config/firebase";
import Expenses from "./Expenses";

export class SpendingLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Spendings: [],
      cat: [],
      spending: [],
      zipped: []
    };
    // this.testingLOL = this.testingLOL.bind(this);
  }

  state = { Spendings: [] };

  componentDidMount() {
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
            cat: ["NONE"],
            spending: ["NONE"]
          });
        } else
          this.setState({
            cat: categories_copy.cat,
            spending: spending_copy.spending
          });
      })
      .catch(function(error) {
        console.log("Error fetching data: ", error);
      });
    // this.testingLOL();
  }

  render() {
    const items = [];
    const zipped = this.state.cat.map((x, i) => [x, this.state.spending[i]]);
    for (const [index, value] of zipped.entries()) {
      items.push(
        <li>
          Category: {value[0]}, Spending: ${value[1]}
        </li>
      );
    }
    console.log(items);
    return <div>{items}</div>;
  }
}

export default SpendingLog;
