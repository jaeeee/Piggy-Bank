import React, { Component } from "react";
//import logo from "./logo.svg";
// import "./App.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {}
    };
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=USD") // data source is an object, not an array.
      .then(res => res.json()) // Short typo for response.
      .then(
        result => {
          this.setState({
            isLoaded: true,
            rates: result.rates
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  prettyCurrency = (crr, action) => {
    if (action === 0) {
      crr = (crr * 102) / 100;
    } else if (action === 1) {
      crr = (crr * 98) / 100;
    } else {
      // Do nothing...
    }
    var fixedCrr = crr.toFixed(4).toString();
    while (fixedCrr.length < 8) {
      fixedCrr = "0" + fixedCrr;
    }

    return fixedCrr;
  };

  createTable = () => {
    const rates = this.state;
    let ratesArr = Object.keys(rates).map(i => rates[i])[2];
    let table = [];
    let children = [];
    let displayedCurrencies = ["RUB", "CAD", "GBP", "CHF", "JPY", "EUR"];

    // The following loop is used to create inner structure (children) of the table.
    for (var key in ratesArr) {
      if (ratesArr.hasOwnProperty(key) && displayedCurrencies.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.prettyCurrency(ratesArr[key], 0)}</td>
            <td>{this.prettyCurrency(ratesArr[key])}</td>
            <td>{this.prettyCurrency(ratesArr[key], 1)}</td>
          </tr>
        );
      }
    }
    table.push(<tbody>{children}</tbody>); // We create the parent tbody tags and add the inner loop (children).

    return table;
  };

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <MDBContainer>
            <MDBCard>
              <MDBCardBody>
                {/* <div className="App-body"> */}
                <table className="currencyTable">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>BUY</th>
                      <th>EXCHANGE RATE</th>
                      <th>SELL</th>
                    </tr>
                  </thead>
                  {this.createTable()}
                </table>
                <p>
                  {/* * base currency is GBP */}
                  <br />
                  Data fetched from&nbsp;
                  <a href="https://exchangeratesapi.io/">
                    https://exchangeratesapi.io/
                  </a>
                  &nbsp;
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </div>
      );
    }
  }
}

export default Converter;
