import React, { Component, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./homepage.css";
import Chevron from "./Chevron";
import SampleForm from "./SampleForm";
import fire from "./config/firebase";
import { db } from "./config/firebase";
import SpendingLog from "./SpendingLog";
import { Card, Button, Accordion } from "react-bootstrap";
import Expenses from "./Expenses";
import Budget from "./Budget";
import Calculator from "./Calculator";
import PieChart from "react-minimal-pie-chart";
import { Line, Doughnut } from "react-chartjs-2";
import LineGraph from "./LineGraph";
import { BrowserRouter as Router } from "react-router-dom";
import Converter from "./Converter";
// import LineGraph from './LineGraph';

function Accordion_OG(props) {
  // tester: fire.auth().currentUser.email
  //setActive is the variable and setActiveState is the function that changes that variable
  const [setActive, setActiveState] = useState("notActive"); //useState allows for state variables inside of functions
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion_icon");
  const panel = useRef(null); //like a 'box' that can hold mutable items in it

  function toggleAccordion() {
    setActiveState(setActive === "notActive" ? "active" : "notActive");
    setHeightState(
      setActive === "active" ? "0px" : `${panel.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion_icon" : "accordion_icon rotate"
    );
  }

  return (
    <div className="accordion_section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion_title">{props.title}</p>
        <Chevron
          className={`${setRotate}`}
          width={13}
          fill={"#777"}
          stroke={"#777"}
          weight={25}
        />
      </button>
      <div
        ref={panel}
        style={{ maxHeight: setHeight }}
        className="accordion_panel"
      >
        <div
          className="accordion_text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // : "",
      focus: ""
    };
  }
  componentDidMount() {
    // this.authListener();
    let currentComp = this;

    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        var found = 0;
        var userRef = db.collection("users").doc(fire.auth().currentUser.email);
        var username = fire.auth().currentUser.email;
        userRef.onSnapshot(
          {
            includeMetadataChanges: true
          },
          function(doc) {
            try {
              //    if (this._isMounted) {

              currentComp.setState({
                // budget: doc.data().budget,
                focus: doc.data().focus
              });
              // }
            } catch (error) {
              console.log("We getting an error: ", error); // ADD back later
              found = 0;
            }
          }
        );

        if (found == 1) {
          //console.log("does hit this")
        } else {
          currentComp.setState({
            focus: ["N/A"]
          });
        }
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.focus ? (
          <div>
            Your focus:{" "}
            <b>
              <mark>{this.state.focus}</mark>
            </b>{" "}
          </div>
        ) : (
          <div>
            <mark>
              You currently do not have a focus, set one in your profile page!
            </mark>
          </div>
        )}
        <Budget />
        {/* <Converter /> */}
        <Expenses />
        <br></br>
        
        {/* <br></br> */}
        <LineGraph />
        {/*   
        {/* <Expenses /> */}
        {/* <h3>Spending Log</h3> */}
        {/* <Accordion
            title="Spending Log"
            <SpendingLog />
            /> */}
        {/* // <SpendingLog /> */}
        {/* /> */}
        {/* <SampleForm /> */}
        <br></br>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <Homepage />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
export default Homepage;
