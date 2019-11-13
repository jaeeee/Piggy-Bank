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
                        // {/* No header, and the drawer stays open on larger screens (fixed drawer). */}
        <div>
          <Navbar />
        <MDBContainer>
          <MDBCard>
            <MDBCardBody>
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
