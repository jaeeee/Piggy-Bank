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
    // this.grabName = this.grabName.bind(this);
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
        
        {/* <Navbar /> */}
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
