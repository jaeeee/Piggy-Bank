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
import fire from "./config/firebase";

export class Profile extends Component {
         _isMounted = false;
         constructor() {
           super();
           this.updateInfo = this.updateInfo.bind(this);
           this.handleChange = this.handleChange.bind(this);
           this.logout = this.logout.bind(this);
           this.state = {
             budget: "",
             //  display_budget: "",
             name: ""
           };
         }

         logout() {
             fire.auth().signOut();
         }

         handleChange(e) {
           // console.log(e.target.value);
           // console.log(e.target.name);
                   if (this._isMounted) {

           this.setState({ [e.target.name]: e.target.value });
                   }
                //    console.log(this.state.name);
         }

         componentDidMount() {
           this._isMounted = true;

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
                            //    if (this._isMounted) {

                     currentComp.setState({
                       budget: doc.data().budget,
                       name: doc.data().name
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
                   budget: ["N/A"]
                 });
               }
             }
           });
         }

         componentWillUnmount() {
           this._isMounted = false;
         }

         updateInfo(e) {
           //    e.preventDefault();
           // console.log("passed signup");
           //    console.log(this.state.name);
        //    console.log("YUH");
        var docRef = db.collection("users").doc(fire.auth().currentUser.email);
        docRef.update({
            name: this.state.name,
            budget: this.state.budget
        })
        //    fire
        //      .firestore()
        //      .doc(`/users/${this.state.email}`)
        //      .update({
        //        name: this.state.name,
        //        budget: this.state.budget
        //        //    wallet: 1000
        //      })
             .then(function() {
               alert("Update successful.");
             })
             .catch(function(error) {
               alert("Error in updating the document.");
             });
           //  alert("Information successfully updated.");
         }

         render() {
           return (
             <div>
               <MDBCardBody>
                 <MDBCard>
                   <MDBContainer>
                     <h3>User Profile</h3>
                     <form>
                       <MDBInput
                         value={this.state.name}
                         onChange={this.handleChange}
                         label="Your name"
                         icon="user"
                         group
                         name="name"
                         type="text"
                         validate
                         error="wrong"
                         success="right"
                       />
                       <MDBInput
                         value={fire.auth().currentUser.email}
                         //  onChange={this.handleChange}
                         label="Your email"
                         icon="envelope"
                         group
                         name="email"
                         type="text"
                         //  validate
                         error="wrong"
                         success="right"
                         disabled
                       />
                       <MDBInput
                         value={this.state.budget}
                         onChange={this.handleChange}
                         label="Budget"
                         icon="envelope"
                         group
                         name="budget"
                         type="number"
                         //  validate
                         error="wrong"
                         success="right"
                         //  disabled
                       />
                       <div className="text-center py-4 mt-3">
                         <MDBBtn
                           color="success"
                           type="button"
                           onClick={this.updateInfo}
                         >
                           Update Info
                         </MDBBtn>
                         <MDBBtn
                           color="danger"
                           type="button"
                           onClick={this.logout}
                         >
                           Logout
                         </MDBBtn>
                         {/* <MDBBtn color="blue" type="submit" onClick="close">
                           Close
                         </MDBBtn> */}
                       </div>
                     </form>
                   </MDBContainer>
                 </MDBCard>
               </MDBCardBody>
             </div>
           );
         }
       }

export default Profile;
