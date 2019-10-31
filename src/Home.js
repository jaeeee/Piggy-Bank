import React, { Component } from "react";
import fire from "./config/firebase";
import Homepage from './homepage';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBCard>
            <Homepage />
          </MDBCard>
        </MDBContainer>
        {/* <Home />  */}
        {/* <button onClick={this.logout}>Logout</button> */}
      </div>
    );
  }
}

export default Home;
