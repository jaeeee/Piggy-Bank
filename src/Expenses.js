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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//actual form files
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

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
	const useStyles = makeStyles(theme => ({
		fab: {
			margin: theme.spacing(1)
		}
	}));
	const[open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const classes = useStyles();
	return (
		<div>
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">New Expense</DialogTitle>
				<DialogContent>
					<ExpenseForm />
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
function ExpenseForm(){
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		margin: {
			margin: theme.spacing(1),
		},
		withoutLabel: {
			marginTop: theme.spacing(3),
		},
		textField: {
			width: 200,
		},
		menu: {
			width: 200,
		},
	}));
	//category choices
	/*const categories = [
		{value: }
	];*/
	const classes = useStyles();
	const [values, setValues] = React.useState({
		name: '',
		amount: '',
		category: '',
		date: '',
	});
	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}
	return(
		<div>
			<FormControl className={classes.margin, classes.textField}>
				<InputLabel htmlFor="standard-adornment-name">Name</InputLabel>
				<Input
					id="standard-adornment-name"
					value={values.name}
					onChange={handleChange('name')}
				/>
			</FormControl>
			<FormControl className={classes.margin, classes.textField}>
				<InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
				<Input
					id="standard-adornment-amount"
					value={values.amount}
					onChange={handleChange('amount')}
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
				/>
			</FormControl>
			<FormControl className={classes.margin, classes.textField}>
				<InputLabel htmlFor="standard-adornment-category">Category</InputLabel>
				<Input
					id="standard-adornment-category"
					value={values.category}
					onChange={handleChange('category')}
				/>
			</FormControl>
			<TextField
				id="date"
				label="Date of Expense"
				type="date"
				placeholder="YYYY-MM-DD"
				className={classes.textField}
				InputLabelProps={{
					shrink: true,
				}}
			/>
		</div>
	);
	
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