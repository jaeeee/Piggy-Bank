import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import fire from "./config/firebase";
import SignUp from "./Signup";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import Recaptcha from "react-recaptcha";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      showsignup: false,
      isVerified: false
    };
  }

  recaptchaLoaded() {
    console.log("captcha loaded lul");
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      });
    }
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    if (this.state.isVerified == true) {
      e.preventDefault();
      console.log(this.state.email);
      fire
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {})
        .catch(error => {
          alert(error);
        });
    } else {
      alert("Please complete human verification.");
    }
  }

  signup(e) {
    if (this.state.isVerified == true) {
    this.setState({
      showsignup: true
    });
  } else {
    alert("Please complete human verification.");
  }
    /*
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });*/
  }

  render() {
    return (
      <MDBContainer>
        {/* <MDBRow> */}
        {/* <MDBCol md="12"> */}
        <MDBCard style={{ width: "80rem", height: "25rem", padding: "50px" }}>
          <form>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                value={this.state.email}
                onChange={this.handleChange}
                label="Type your email"
                icon="envelope"
                group
                name="email"
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                value={this.state.password}
                onChange={this.handleChange}
                label="Type your password"
                icon="lock"
                group
                name="password"
                type="password"
                validate
              />
            </div>
            <div className="d-inline">
              <MDBBtn type="submit" onClick={this.login}>
                Login
              </MDBBtn>
            </div>
            <div className="d-inline">
              <MDBBtn color="indigo" onClick={this.signup}>
                SignUp
              </MDBBtn>
              {this.state.showsignup ? <SignUp /> : null}
            </div>
          </form>
        </MDBCard>
        <Recaptcha
          sitekey="6LdiycUUAAAAAO3vnWuzvNupDAi27ml9ywGkUCTl"
          render="explicit"
          // verifyCallback={verifyCallback}
          onloadCallback={this.recaptchaLoaded}
          verifyCallback={this.verifyCallback}
        />
        {/* </MDBCol> */}
        {/* </MDBRow> */}
      </MDBContainer>
    );
  }
}
export default Login;
