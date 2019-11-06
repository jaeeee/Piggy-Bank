import React from "react";
import fire from "./config/firebase";
//import "./Expenses.css";
//import Chevron from "./Chevron";
//expansion panel files
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//expense table files
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Accordion(){
	const useStyles = makeStyles(theme => ({
		root: {
			width: '100%',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular,
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ExpansionPanel>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>
						This Months's Expenses
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography>
						<ExpenseTable />
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

function ExpenseTable(){
	const useStyles = makeStyles({
		root: {
			width: '100%',
			overflowX: 'auto',
		},
		table: {
			minWidth: 650,
		},
	});
	function createExpense(name, amount, category, date){
		return {name, amount, category, date};
	}
	var expenses = [
		createExpense('Whole Foods', 45, 'Groceries', '11/6/2019'),
		createExpense('Movie', 30, 'Entertainment', '10/31/2019'),
	];

	const classes = useStyles();

	return (
		<Paper className={classes.root}>
			<Table className={classes.table} aria-label="Expenses">
				<TableHead>
					<TableRow>
						<TableCell>Expense</TableCell>
						<TableCell align="right">Amount</TableCell>
						<TableCell align="right">Category</TableCell>
						<TableCell align="right">Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses.map(expenses=> (
						<TableRow key = {expenses.index}>
							<TableCell component="th" scope="row">
								{expenses.name}
							</TableCell>
							<TableCell align="right">{expenses.amount}</TableCell>
							<TableCell align="right">{expenses.category}</TableCell>
							<TableCell align="right">{expenses.date}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

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
				<Accordion />
			</div>
		);
	}
}

export default Expenses;
