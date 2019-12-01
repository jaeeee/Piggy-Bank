import React from "react";
import { NotificationManager } from "react-notifications";
import { db } from "./config/firebase";
import fire from './config/firebase';
// import ''

class SampleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: this.props.user,
      formValues: {
        name: "",
        role: "",
        cats: [],
        spending: [],
        dates: []

      },
      formErrors: {
        name: "",
        role: ""
      },
      formValidity: {
        name: false,
        role: false
      },
      isSubmitting: false,
      docExists: false
    };
    //this.addUser = this.addUser.bind(this);
    //  this.authListener = this.authListener.bind(this);
  }

  // componentDidMount() {
  //   this.authListener();
  // }

  // authListener() {
  //   fire.auth().onAuthStateChanged(user => {
  //     console.log(user);
  //     if (user) {
  //       this.setState({ user });
  //       localStorage.setItem("user", user.uid);
  //     } else {
  //       this.setState({ user: null });
  //       localStorage.removeItem("user");
  //     }
  //   });
  // }

  getFormattedDate(date){
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  addUser = () => {
    const user = fire.auth().currentUser.email;
    const tempname = this.state.formValues.name;
    const temprole = this.state.formValues.role;
    const tempDate = this.getFormattedDate(new Date());
    const data = {
      ...this.state.formValues,
      spending: [temprole],
      dates: [tempDate]
    };

    let userRef = db.collection("sample_data").doc(user);

    console.log(tempname);
    userRef.update({
      name: tempname,
      role: temprole,
      cats: fire.firestore.FieldValue.arrayUnion(tempname),
      spending: fire.firestore.FieldValue.arrayUnion(temprole),
      dates: fire.firestore.FieldValue.arrayUnion(tempDate)
    })
    .then(function(){
      console.log("User data added to doc");
    })
    .catch(function(error) {
      console.log("Error getting document:", error )
      userRef.set(data)
      .then(function(){
      })
      .catch(function(error){
        console.log("There is something really going wrong", error);
      })
    });

    /*userRef.get().then(function(doc,tempName) {
        if (doc.exists) {
            console.log("User data added to doc");
            console.log(tempName);
            doc.update({
              cats: fire.firestore.FieldValue.arrayUnion(tempName)
            });
          }
        }).catch(function(error) {
        console.log("Error getting document:", error);
        this.setState({ isSubmitting: false });
        });*/

    /*if(checker){
        alert("Entered updated field");
        userRef.update({
          cats: fire.firestore.FieldValue.arrayUnion(this.state.formValues.name)
        })
        .then(() => {
          // NotificationManager.success("A new user has been added", "Success");
          window.location = "/";
          console.log("sucessfully updated")
        })
        .catch(error => {
          console.log("Error updating document:", error);
          this.setState({ isSubmitting: false });
        });
    } else{
      userRef.set(data)
      .then(() => {
        // NotificationManager.success("A new user has been added", "Success");
        window.location = "/";
        console.log("sucessfully created")
      })
      .catch(error => {
        console.log("Error creating document:", error);
        this.setState({ isSubmitting: false });
      });
    }*/

    /*
    db.collection("sample_data")
    // db.collection(JSON.stringify(user))
      .doc(user)
      .set(data)
      .then(() => {
        // NotificationManager.success("A new user has been added", "Success");
        window.location = "/";
      })
      .catch(error => {
        // NotificationManager.error(error.message, "Create user failed");
        this.setState({ isSubmitting: false });
      });*/
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    console.log(this.state.isSubmitting);
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      this.addUser();
    } else {
      console.log("")
      const { formValues } = this.state;
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.setState({ formValues });
        this.handleValidation(target);
      }
      // NotificationManager.error(
      //   "Please check on the validation message below form fields",
      //   "Validation error"
      // );
    }
  };

  handleAppendCat = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.state.formValues.cats.push(target.value);
    this.setState({ formValues });
    this.handleValidation(target);
  };
  handleChangeName = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };
  handleChangeRole = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = target => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const isImage = name === "image";


    if (!isImage && name ) {
      validity[name] = value.length > 0;
      fieldValidationErrors[name] = validity[name]
        ? ""
        : `${name} is required and cannot be empty`;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  render() {
    // console.log("Hi we're rendering the sample form now");
    // console.log("The current logged in user is " + this.state.user);
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <>
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            {/* <h1 className="mt-5">SAMPLE FORM LET'S GO</h1> */}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Category of Spending</label>
                <input
                  class="mdl-textfield__input"
                  type="text"
                  name="name"
                  className={`form-control ${
                    formErrors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Enter category name"
                  value={formValues.name}
                  onChange={this.handleChangeName}
                />
                <div className="invalid-feedback">{formErrors.name}</div>
              </div>
              <div className="form-group">
                <label>Amount Spent</label>
                <input
                  type="number"
                  min="0"
                  name="role"
                  className={`form-control ${
                    formErrors.role ? "is-invalid" : ""
                  }`}
                  placeholder="Enter amount spent"
                  onChange={this.handleChangeRole}
                  value={formValues.role}
                />
                <div className="invalid-feedback">{formErrors.role}</div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
                name="name"
                value={formValues.name}
                onClick={this.handleAppendCat}
              >
                {isSubmitting ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SampleForm;
