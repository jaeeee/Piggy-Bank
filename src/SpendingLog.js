import React, { Component } from 'react'
import fire from './config/firebase';
import {db} from './config/firebase';

export class SpendingLog extends Component {
    //     // state = { Spendings: []}
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         Spendings: []
    //     }
    // // state = { Spendings: []};
    // }

    state = { Spendings: []};

    componentDidMount() {
        //  const user = fire.auth().currentUser.email;
                var Spendings = [];

                var docRef = db.collection("sample_data").doc("daniel.kwong.h@gmail.com");
        fire.firestore().collection("sample_data").limit(10).get()
        .then(querySnapshot => {
            //  .then(function(querySnapshot) {
                        //    const Spendings = [];
        querySnapshot.forEach(function(doc) {
          Spendings.push({
              cat: doc.data().cat,
              amount: doc.data().role,
          });
        });
                 this.setState({ Spendings });
        // this.setState({Spendings});
        }).catch(function(error) {
            // alert("Error fetching user data");
            console.log("Error fetching data: ", error);
        });
         console.log(Spendings);
         this.state = {
           Spendings: Spendings
         };
        // this.state.Spendings = Spendings;
        //  console.log("Data: " + Spendings);
    }
    // }
    render() {
        //  console.log("State: " {this.state.Spendings});
        return (
          // alert("SUP"),
          <div>
            {/* <MDBCard> */}
              <h4>Spending Log</h4>
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
