import React from "react";

var totalcalc;
var totalmonths;

class SpendingCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountneed: '',
      currentsave: '',
	  yearstosave: '',
	  monthstosave: '',
      amError: '',
      csError: '',
	  yrError: '',
	  moError: ''
    };
  }

  handleAMChange = event => {
    this.setState({ amountneed: event.target.value }, () => {
      this.validateAM();
    });
  };


  handleCSChange = event => {
    this.setState({ currentsave: event.target.value }, () => {
      this.validateCS();
    });
  };

  handleYRChange = event => {
    this.setState({ yearstosave: event.target.value }, () => {
      this.validateYR();
    });
  };

  handleMOChange = event => {
    this.setState({ monthstosave: event.target.value }, () => {
      this.validateMO();
    });
  };

  validateAM = () => {
    const { amountneed } = this.state;
    this.setState({
      amError:
        amountneed > 0 ? null : 'Invalid input'
    });
  }

  validateCS = () => {
    const { currentsave } = this.state;
    this.setState({
      csError:
        currentsave > -1 ? null : 'Invalid input'
    });
  }

  validateYR = () => {
    const { yearstosave } = this.state;
    this.setState({
      yrError:
        yearstosave > -1 ? null : 'Invalid input'
    });
  }

  validateMO = () => {
    const { monthstosave } = this.state;
    this.setState({
      moError:
        monthstosave > -1 ? null : 'Invalid input'
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { amountneed, currentsave, yearstosave, monthstosave } = this.state;
	totalmonths = (Number(yearstosave*12) + Number(monthstosave));
	totalcalc = ((Number(amountneed) - Number(currentsave)) / Number(totalmonths));
    alert(`You need to save approximately $` + Math.ceil(totalcalc) + ` per month to reach your goal. \nGood luck!`);
  };
  

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
	  
	  
        <div className='form-group'>
          <label htmlFor='amountneed'>How much will you need?</label>
          <input
            amountneed='amountneed'
            className={`form-control ${this.state.amError ? 'is-invalid' : ''}`}
            id='amountneed'
            placeholder='1000'
			type="number"
            value={this.state.amountneed}
            onChange={this.handleAMChange}
            onBlur={this.validateAM}
          />
          <div className='invalid-feedback'>{this.state.amError}</div>
        </div>
		
		
        <div className='form-group'>
          <label htmlFor='currentsave'>How much do you currently have saved?</label>
          <input
            currentsave='currentsave'
            className={`form-control ${this.state.csError ? 'is-invalid' : ''}`}
            id='currentsave'
            placeholder='1000'
			type="number"
            value={this.state.currentsave}
            onChange={this.handleCSChange}
            onBlur={this.validateCS}
          />
          <div className='invalid-feedback'>{this.state.csError}</div>
        </div>
		
        <div className='form-group'>
          <label htmlFor='yearstosave'>How many years?</label>
          <input
            yearstosave='yearstosave'
            className={`form-control ${this.state.yrError ? 'is-invalid' : ''}`}
            id='yearstosave'
            placeholder='0'
			type="number"
            value={this.state.yearstosave}
            onChange={this.handleYRChange}
            onBlur={this.validateYR}
          />
          <div className='invalid-feedback'>{this.state.yrError}</div>
        </div>
		
        <div className='form-group'>
          <label htmlFor='monthstosave'>How many months?</label>
          <input
            monthstosave='monthstosave'
            className={`form-control ${this.state.moError ? 'is-invalid' : ''}`}
            id='monthstosave'
            placeholder='0'
			type="number"
            value={this.state.monthstosave}
            onChange={this.handleMOChange}
            onBlur={this.validateMO}
          />
          <div className='invalid-feedback'>{this.state.moError}</div>
        </div>

        <button type='submit' className='btn btn-success btn-block'>
          Submit
        </button>
      </form>
    );
  }
}


export default SpendingCalc;
