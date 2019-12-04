import React from "react";
import { db } from "./config/firebase";
import fire from "./config/firebase";
import ExpenseForm from "./ExpenseForm"
// import Calculator from './layout/Calculator/Calculator';
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
import { withRouter } from 'react-router-dom';
// import "mdbreact/dist/css/mdb.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

class Expenses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expenses: [],
			found: false,
		}
		this.UserExpenseTable = this.UserExpenseTable.bind(this);
		this.ExampleExpenseTable = this.ExampleExpenseTable.bind(this);
		this.Accordion = this.Accordion.bind(this);
	}

	createExpense(name, amount, category, date){
		return {name, amount, category, date};
	}
	componentDidMount() {
		let currentComp = this;

		fire.auth().onAuthStateChanged(function(user) {
			if(user){
				var userRef = db.collection("users").doc(fire.auth().currentUser.email);
				var username = fire.auth().currentUser.email;

				userRef.onSnapshot({
					// Listen for document metadata changes
					includeMetadataChanges: true
				}, function(doc) {
					if(doc.data().expenses === undefined){
						currentComp.setState({
							found: false
						});
					}else{
						currentComp.setState({
							expenses: doc.data().expenses,
							found: true,
						});
					}
				});
			}
		});
	}

	Accordion(){
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
		
		let table;
		if(this.state.found){
			table = <this.UserExpenseTable />;
		}else{
			table = <this.ExampleExpenseTable />;
		}

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
							{table}
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}

	ExampleExpenseTable(){
		const useStyles = makeStyles({
			root: {
				width: '100%',
				overflowX: 'auto',
			},
			table: {
				minWidth: 650,
			},
		});
		var examples = [];
		examples = [this.createExpense('Stater Bros', 50, 'Groceries', '11/25/2019')]
		examples.push(this.createExpense('Movie', 30, 'Entertainment', '11/18/2019'));
		examples.push(this.createExpense('Disneyland', 300, 'Entertainment', '11/10/2019'));
		const classes = useStyles();
		return (
			<Paper className={classes.root}>
				<Table className={classes.table} aria-label="Example Expenses">
					<TableHead>
						<TableRow>
							<TableCell>Example Expenses</TableCell>
							<TableCell align="right">Amount</TableCell>
							<TableCell align="right">Category</TableCell>
							<TableCell align="right">Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{examples.map(examples => (
							<TableRow key = {examples.index}>
								<TableCell component="th" scope="row">
									{examples.name}
								</TableCell>
								<TableCell align="right">{examples.amount}</TableCell>
								<TableCell align="right">{examples.category}</TableCell>
								<TableCell align="right">{examples.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		);
	}

	UserExpenseTable(){
		const useStyles = makeStyles({
			root: {
				width: '100%',
				overflowX: 'auto',
			},
			table: {
				minWidth: 650,
			},
		});
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
						{this.state.expenses.map(expenses => (
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

	render(){
		return (
			<div>
				 {/* <MDBContainer> */}
          {/* <MDBCard> */}
            {/* <MDBCardBody> */}
				<this.Accordion />
				<ExpenseForm />
				{/* </MDBCardBody> */}
				{/* </MDBCard> */}
				{/* </MDBContainer> */}
			</div>
		);
	}
}
export default withRouter(Expenses);