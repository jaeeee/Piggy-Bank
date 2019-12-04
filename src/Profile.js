import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import { db } from "./config/firebase";
import fire from './config/firebase';


export class Profile extends Component {
         constructor() {
           super();
           this.state = {
             budget: "",
            //  display_budget: "",
             name: ""
           };
         }

         componentDidMount() {
           let currentComp = this;

           fire.auth().onAuthStateChanged(function(user) {
             if (user) {
               var found = 0;
               var userRef = db
                 .collection("users")
                 .doc(fire.auth().currentUser.email);
               var username = fire.auth().currentUser.email;
               userRef.onSnapshot(
                 {
                   includeMetadataChanges: true
                 },
                 function(doc) {
                   try {
                     currentComp.setState({
                       budget: doc.data().budget,
                       name: doc.data().name
                     });
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
                   budget: ["N/A"]
                 });
               }
             }
           });
         }

         render() {
           return (
             <div>
               <MDBCardBody>
                 <MDBCard>
                   <MDBContainer>
                     <h3>My Profile</h3>
                     Name: {this.state.name} <br></br>
                     Email: {fire.auth().currentUser.email} <br></br>
                     Budget: ${this.state.budget}
                   </MDBContainer>
                 </MDBCard>
               </MDBCardBody>
             </div>
           );
         }
       }

export default Profile;
