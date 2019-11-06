import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import fire from "./config/firebase";
import SignUp from "./Signup"
import App from "./App"
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      showsignup: false
    };
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    console.log(this.state.email);
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        alert(error);
      });
  }

  signup(e) {
    this.setState({
      showsignup: true
    });
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
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          //<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <MDBCard style={{ width: "44rem", height: "24rem", padding: "50px" }}>
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
                  </form>
                  <div className="d-inline">
                      <MDBBtn color="indigo" onClick={this.signup} >
                        SignUp
                      </MDBBtn>
                      {this.state.showsignup ? <Redirect to="/signup" /> : null}
                  </div>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        //</div>;
    </Switch>
    </Router>
      // </div>

      /*  <div className="col-md-6">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" onClick={this.login} class="btn btn-primary">
            Login
          </button>*/
    );
  }
}
export default Login;
