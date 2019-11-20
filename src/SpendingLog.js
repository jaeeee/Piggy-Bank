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
    // cat: [],
    // spending: []
    }
  };

  state = { Spendings: [] };

  componentDidMount() {
    var Spendings = [];
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
            Spendings.push({
              cat: doc.data().cats,
              // amount: doc.data().role,
              spending: doc.data().spending
            });
          }
        });
        this.setState({ Spendings });
        // this.setState({Spendings});
      })
      .catch(function(error) {
        // alert("Error fetching user data");
        console.log("Error fetching data: ", error);
      });
    console.log(Spendings);
    this.state = {
      Spendings: Spendings
    };
    // this.state.Spendings = Spendings;
    //  console.log("Data: " + Spendings);
    console.log(Spendings);
  }
  // }

  render() {
    //  console.log("State: " {this.state.Spendings});
    return (
      // alert("SUP"),
      <div>
        {/* <MDBCard> */}
        {/* <h4>Spending Log</h4> */}
        {/* alert({this.state.Spendings}); */}
        <ul>
          {this.state.Spendings.map(v => {
            return (
              <li>
                {" "}
                <p>
                  v.cat.map(item, index)
                  Category: {v.cat} <br></br>Spending: {v.spending}
                </p>
              </li>
            );
          })}
          {/* tryThis(); */}
          {/* {this.tryThis()}   */}

          {/* </MDBCard> */}
        </ul>
      </div>
    );
  }
}

export default SpendingLog;
