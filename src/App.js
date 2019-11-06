import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import fire from "./config/firebase";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>

          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <div className="App">{this.state.user ? <Redirect to="/home" /> :  <Redirect to="/" />}</div>
          </div>;
      </Router>
    );
  }
}

export default App;
