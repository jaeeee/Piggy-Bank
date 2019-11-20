import React, { Component } from "react";
import fire from "./config/firebase";
import { db } from "./config/firebase";

export class SpendingLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    // user: null,
    // loading: true,
    Spendings: [],
    cat: [],
    spending: []
    }
  };

  state = { Spendings: [] };

  componentDidMount() {
    // var Spendings = [];
    var categories_copy = [];
    var spending_copy = [];
    var found = 0;
    fire
      .firestore()
      .collection("sample_data")
      .get()
      .then(querySnapshot => {
        //  .then(function(querySnapshot) {
        //    const Spendings = [];
        querySnapshot.forEach(function(doc) {
          // console.log(doc.id);
          if (doc.id == fire.auth().currentUser.email) {
            // console.log("nice");
            // this.setState
            spending_copy.spending = doc.data().spending;
            // spending_copy.push({
              // spending: doc.data().spending
            // });
            categories_copy.cat = doc.data().cats;
            // categories_copy.push({
              // cat: doc.data().cats
            // });
            // Spendings.push({
            //   cat: doc.data().cats, 
            //   // amount: doc.data().role,
            //   spending: doc.data().spending
            // });
            found = 1;
          }
        });
                if (found == 0) {
                  this.setState({
                    cat: ["NONE"],
                    spending: ["NONE"]
                  });
                } else 
        this.setState({ 
          // Spendings: Spendings,
        cat: categories_copy.cat,
        spending: spending_copy.spending });
        // this.setState({Spendings});
      })

      .catch(function(error) {
        // alert("Error fetching user data");
        console.log("Error fetching data: ", error);
      });
    // console.log(Spendings);
    // this.state = {
    //   Spendings: Spendings
    // };
    // this.state.Spendings = Spendings;
    //  console.log("Data: " + Spendings);
    // console.log(Spendings);
    console.log(categories_copy);
    console.log(spending_copy);
  }
  // }



  render() {
    //  console.log("State: " {this.state.Spendings});
    return (
      // alert("SUP"),
      <div>
        {this.state.cat.map(v => {
          return (
            // <li>
            // {" "}
            <p>Category: {v}</p>
          );
        })}
        {this.state.spending.map(v => {
          return (
            // <li>
            // {" "}
            <p>Spending: {v}</p>
          );
        })}
      </div>
    );
  }
}

export default SpendingLog;
