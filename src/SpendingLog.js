import React, { Component } from "react";
import fire from "./config/firebase";
import { db } from "./config/firebase";

export class SpendingLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    // user: null,
    // loading: true,
    Spendings: []
    }
  };
  //     // state = { Spendings: []}
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         Spendings: []
  //     }
  // // state = { Spendings: []};
  // }

  state = { Spendings: [] };

  // getUser() {
  //   var trial = "";
  //   trial = fire.auth().currentUser.email;
  //   return trial;
  // }

  //  const user = fire.auth().currentUser.email;
  componentDidMount() {
    // fire.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     this.setState({ user });
    //   } else {
    //     this.setState({ user: null });
    //   }

    //   if (this.state.loading) {
    //     this.setState({ loading: false });
    //   }
    // });
    // const user = fire.auth().currentUser.email;
    var Spendings = [];
    // const user = fire.auth().currentUser;
    // console.log(this.getUser());
    // var docRef = db.collection("sample_data").doc("daniel.kwong.h@gmail.com");
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
        {this.state.Spendings.map(v => {
          return <p>Amount: {v.amount}</p>;
        })}
        {/* </MDBCard> */}
      </div>
    );
  }
}

export default SpendingLog;
