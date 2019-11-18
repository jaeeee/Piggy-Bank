import React, { Component, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import './homepage.css';
import Chevron from "./Chevron";
import SampleForm from './SampleForm';
import fire from "./config/firebase";
import {db} from './config/firebase';
import SpendingLog from './SpendingLog';
import {Card, Button, Accordion} from 'react-bootstrap';

function Accordion_OG(props) {
  // tester: fire.auth().currentUser.email
  //setActive is the variable and setActiveState is the function that changes that variable
  const [setActive, setActiveState] = useState("notActive"); //useState allows for state variables inside of functions
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion_icon");
  const panel = useRef(null);     //like a 'box' that can hold mutable items in it
  

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
        <Chevron className={`${setRotate}`} width={13} fill={"#777"} stroke={"#777"} weight={25}/>
      </button>
      <div ref={panel} 
        style={{maxHeight: setHeight}}
        className="accordion_panel">
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
      fuck_you: "",
      };
    }
    // var user = firebase.auth().currentUser;
    // console.log(fire.auth().currentUser);
    // console.log("hi");
   render(){
    //  if (fire.auth().currentUser != null) {
    //    console.log(fire.auth().currentUser.email);
    //  }
    //  this.state.fuck_you = (fire.auth().currentUser.email);
    //  const FUCK_YOU = fire.auth().currentUser.email;
        //  console.log(fire.auth().currentUser);
       return (
         <div>
           <Accordion_OG
             title="Overview"
             content="
                <p>
                  You spent too much money today <br/>
                  thats not good <br/>
                  spend less <br/>
                  tomorrow 
                </p>"
           />
           <Accordion_OG
             title="Wallet"
             content="
                <p>
                 Look at my money $$$ <br/>
                 $1,000,000 <br/>
                 I'm rich!!!
                </p>"
           />
           <Accordion>
             <Card>
               <Card.Header>
                 <Accordion.Toggle as={Button} variant="link" eventKey="0">
                   Submit Spending
                 </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey="0">
                 <Card.Body>
                   <h4>Submit Spending</h4>
            <SampleForm />
                 </Card.Body>
               </Accordion.Collapse>
             </Card>
             <Card>
               <Card.Header>
                 <Accordion.Toggle as={Button} variant="link" eventKey="1">
                   Spending Log
                 </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey="1">
                 <Card.Body>
                   <SpendingLog />
                 </Card.Body>
               </Accordion.Collapse>
             </Card>
           </Accordion>
           <br></br>
           {/* <h3>Spending Log</h3> */}
           {/* <Accordion
            title="Spending Log"
            <SpendingLog />
            /> */}
           {/* // <SpendingLog /> */}
           {/* /> */}

           {/* <SampleForm /> */}
         </div>
       );
   }
  }

ReactDOM.render(<Homepage/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
export default Homepage;
