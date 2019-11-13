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
        role: ""
      },
      formErrors: {
        name: "",
        role: ""
      },
      formValidity: {
        name: false,
        role: false
      },
      isSubmitting: false
    };
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

  addUser = () => {
    const user = fire.auth().currentUser.email;
    const data = {
      ...this.state.formValues,
      uid: new Date().getTime()
    };
    db.collection("sample_data")
      .doc(data.uid.toString())  
      .set(data)
      .then(() => {
        // NotificationManager.success("A new user has been added", "Success");
        window.location = "/";
      })
      .catch(error => {
        // NotificationManager.error(error.message, "Create user failed");
        this.setState({ isSubmitting: false });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      this.addUser();
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.handleValidation(target);
      }
      // NotificationManager.error(
      //   "Please check on the validation message below form fields",
      //   "Validation error"
      // );
      this.setState({ isSubmitting: false });
    }
  };

  handleChange = ({ target }) => {
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

    if (!isImage) {
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
                  type="text"
                  name="name"
                  className={`form-control ${
                    formErrors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Enter category name"
                  onChange={this.handleChange}
                  value={formValues.name}
                />
                <div className="invalid-feedback">{formErrors.name}</div>
              </div>
              <div className="form-group">
                <label>Amount Spent</label>
                <input
                  type="text"
                  name="role"
                  className={`form-control ${
                    formErrors.role ? "is-invalid" : ""
                  }`}
                  placeholder="Enter amount spent"
                  onChange={this.handleChange}
                  value={formValues.role}
                />
                <div className="invalid-feedback">{formErrors.role}</div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
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
