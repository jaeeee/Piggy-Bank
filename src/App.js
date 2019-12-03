import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import fire from "./config/firebase";
import Home from "./Home";
import Main from "./Main";
import Login from "./Login";
import Navbar from "./Navbar";
import SignUp from "./Signup";
// import homepage from "./homepage";
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
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
      // console.log(user);
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
            // console.log("hi");
            console.log(this.state.user);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Layout fixedHeader>
          <Header
            title={
              <span>
                <span style={{ color: "#ddd" }}>Piggy Bank </span>
                {/* <strong>2020</strong> */}
              </span>
            }
          >
            <Navigation>
              <Link to="/">Home</Link>
              {/* <a href="#">Line Graph</a> */}
              <Link to="/expenses">Expenses</Link>
              <Link to="/linegraph">Statistics</Link>
              <Link to="/spendingcalc">Savings Estimator</Link>
              <Link to="/calculator">Calculator</Link>
              {/* <Link to="/contact">Contact</Link> */}
            </Navigation>
          </Header>
          <Drawer>
            <Navigation>
              <Link to="/">Home</Link>
              <Link to="/expenses">Expenses</Link>
              <Link to="/linegraph">Statistics</Link>
              <Link to="/spendingcalc">Savings Estimator</Link>
              <Link to="/calculator">Calculator</Link>
            </Navigation>
          </Drawer>
          <Content>
            <div className="page-content" />
            <div className="App">{this.state.user ? <Main /> : <Login />}</div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
