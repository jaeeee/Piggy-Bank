import React, { Component } from "react";
import "./App.css";
import fire from "./config/firebase";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

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
	return (
	//return <div className="App">{ this.state.user ? <Home /> : <Login />}</div>;
		<div>
			<Navbar />
			<Home />
		</div>
	)
    
  }
}

export default App;
