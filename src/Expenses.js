import React, {Component} from "react";
import fire from "./config/firebase";

class ExpenseForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			purchase: Array(4).fill(null)
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		return;
	}
	handleInputChange(event){
		const purchase = this.state.purchase.slice();
		const target = event.target;
		const value = event.value;
		const name = target.name;

		if(name === "name"){
			this.setState({
				purchase: purchase[0] = value
			});
		}
		else if(name === "amount"){
			this.setState({
				purchase: purchase[1] = value
			});
		}
		else if(name === "category"){
			this.setState({
				purchase: purchase[2] = value
			});
		}
		else if(name === "date"){
			this.setState({
				purchase: purchase[3] = value
			});
		}
	}

	getPurchase(){
		return this.state.purchase;
	}

	render(){
		return(
			<form onSubmit = {this.handleSubmit}>
				<label>
					Name:
					<input
						name = "name"
						type = "textarea"
						value = {this.state.purchase[0]}
						onChange = {() => this.handleInputChange} />
				</label>
				<br />
				<label>
					Amount:
					<input
						name = "amount"
						type = "textarea"
						value = {this.state.purchase[1]}
						onChange = {() => this.handleInputChange} />
				</label>
				<br />
				<label>
					Category:
					<input
						name = "category"
						type = "textarea"
						value = {this.state.purchase[2]}
						onChange = {() => this.handleInputChange} />
				</label>
				<br />
				<label>
					Date:
					<input
						name = "date"
						type = "textarea"
						value = {this.state.purchase[3]}
						onChange = {() => this.handleChange} />
				</label>
				<br />
				<input type = "submit" value = "Submit" />
			</form>
		);
	}
}

class Expenses extends React.Component {
	/*constructor(props){
		super(props);
		this.state = {
			expenses: Array(1).fill(null),
			expenseNumber: 0
		}
	}

	/*handleInputChange(event){
		const expenses = this.state.expenses.slice();
		const expenseNumber = this.state.expenseNumber;
		const target = event.target;
		const value = event.value;
		const name = target.name;
		if(name === "name"){
			this.setState({
				expenses: expenses[this.expenseNumber][0] = value
			});
		}
		else if(name === "amount"){
			this.setState({
				expenses: expenses[this.expenseNumber][1] = value
			});
		}
		else if(name === "category"){
			this.setState({
				expenses: expenses[this.expenseNumber][2] = value
			});
		}
		else if(name === "date"){
			this.setState({
				expenses: expenses[this.expenseNumber][3] = value
			});
		}
	}

	handleSubmit(event){
		var expenseNumber = this.state.expenseNumber;
		//this.renderPurchases();
		this.setState({ expenseNumber: expenseNumber++ });
	}

	renderExpenseForm(){
		//var expenseNumber = this.state.expenseNumber;
		console.log("in form rendering");
		return (
			<form onSubmit = {() => this.handleSubmit()}>
				<label>
					Name:
					<input
						name = "name"
						type = "textarea"
						value = "Name"
						onChange = {() => this.handleInputChange()} />
				</label>
				<br />
				<label>
					Amount:
					<input
						name = "amount"
						type = "number"
						value = "$0"
						onChange = {() => this.handleInputChange()} />
				</label>
				<br />
				<label>
					Category:
					<input
						name = "category"
						type = "textarea"
						value = "e.g. Shopping"
						onChange = {() => this.handleInputChange()} />
				</label>
				<br />
				<label>
					Date:
					<input
						name = "date"
						type = "textarea"
						value = "MM/DD/YY"
						onChange = {() => this.handleInputChange()} />
				</label>
				<br />
				<input type = "submit" value = "Submit" />
			</form>
		);
	}

	/*renderPurchases(){
		const listItems = this.state.expenses.map((purchase) =>
			<li>{purchase}</li>
		);
		return (
			<u1>{listItems}</u1>
		);
	}*/
	
	render(){
		return (
			<div>
				<h1>This Month's Expenses</h1>
				
				<div>
				<ExpenseForm />
				<button>Add Expense</button>
				</div>
			</div>
		);
	}
}

export default Expenses;
