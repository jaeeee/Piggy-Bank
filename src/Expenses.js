import React from "react";
import fire from "./config/firebase";
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
//Form Dialog files
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var expenses;
//var numExpenses = expenses.length;
function createExpense(name, amount, category, date){
	return {name, amount, category, date};
}
//expenses = [createExpense('Example', 1000, 'fun', '1/1/0001')];
function addExpense(name, amount, category, date){
	if(expenses[0].name === 'Example'){
		expenses = [createExpense(name, amount, category, date)];
	}else{
		expenses.push(createExpense(name, amount, category, date));
	}
}

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
						This Month's Expenses
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
	
	expenses = [createExpense('Whole Foods', 45, 'Groceries', '11/6/2019')];
	expenses.push(createExpense('Movie', 30, 'Entertainment', '10/31/2019'));
	expenses.push(createExpense('Disneyland', 300, 'Leisure', '11/10/2019'));
	//addExpense('Whole Foods', 45, 'Groceries', '11/6/2019');
	//addExpense('Movie', 30, 'Entertainment', '10/31/2019');
	//addExpense('Disneyland', 300, 'Leisure', '11/10/2019');
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
					{expenses.map(expenses => (
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

function ExpenseFormDialog(){
	const[open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Add Expense
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">New Expense</DialogTitle>
				<DialogContent>
					<DialogContentText>
						insert expenses form here
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
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
	
	render(){
		
		return (
			<div>
				<Accordion />
				<ExpenseFormDialog />
			</div>
		);
	}
}

export default Expenses;