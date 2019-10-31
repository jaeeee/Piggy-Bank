import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import fire from "./config/firebase";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import SignUp from "./Signup";
// import homepage from "./homepage";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Chevron from "./Chevron";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {

    return( 
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <div className="App">{this.state.user ? <Home /> : <Login />}</div>);
    </div>);
  }
}

export default App;
