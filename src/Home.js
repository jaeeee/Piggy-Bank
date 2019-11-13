import React, { Component } from "react";
import fire from "./config/firebase";
import Homepage from './homepage';
import Navbar from "./Navbar";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import { db } from "./config/firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testing: "",
    };
    this.logout = this.logout.bind(this);
    this.grabName = this.grabName.bind(this);
  }

  grabName() {
    var final = "";
    // console.log("Before");
    // console.log(final);
    var docRef = db.collection("users").doc(fire.auth().currentUser.email);
    docRef.get().then(function(documentSnapshot) {
      // console.log(documentSnapshot.data());
        // var converted = JSON.stringify(documentSnapshot.data())
        // console.log(converted);
        // console.log(documentSnapshot.data().name);
        // alert(converted.name);
        // console.log(converted.name);
        // return converted[name];
        // console.log();
        // this.state.testing = documentSnapshot.data().name;
        // final = documentSnapshot.data().name;
        final = documentSnapshot.data().name;
        // this.setState.testing = "FUCK";
        // alert("Welcome back, " + final);
        // this.setState.testing = final;
        return final;
    });
    // console.log("After");
    // console.log(final);
    // return final;
    // var name = "YES
    // "
    // return name;
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    // this.setState.testing = fire.auth().currentUser.email;
      // this.state.testing = "dmfiaogpa";
      // console.log(this.grabName());
      this.state.testing = this.grabName();
    return (
 
      // {/* No header, and the drawer stays open on larger screens (fixed drawer). */}
      <div>
        <Navbar />
        <MDBContainer>
          <MDBCard>
            <MDBCardBody>
              {/* {this.grabName} */}
              <h3>Piggy Bank  { this.state.testing } </h3> 
              <Homepage />
              <MDBBtn onClick={this.logout}>Logout</MDBBtn>
              {/* <button onClick={this.logout}>Logout</button> */}
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        {/* <Home />  */}
      </div>
    );
  }
}

export default Home;
