import React from "react";
import { db } from "./config/firebase";
import fire from "./config/firebase";
import firebase from 'firebase';
import {makeStyles} from '@material-ui/core/styles';
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
import { array } from "prop-types";

class ExpenseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            amount: '',
            category: '',
            date: 0,
        }
        //this.state = this.state.bind(this);
        this.NewExpenseForm = this.NewExpenseForm.bind(this);
        this.ExpenseFormDialog = this.ExpenseFormDialog.bind(this);
        this.createExpense = this.createExpense.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createExpense(name, amount, category, date){
		return {name, amount, category, date};
	}

    handleChange = prop => event => {
        //setValues({ ...values, [prop]: event.target.value })
        this.setState({
            [prop]: event.target.value,
        });
    }

    NewExpenseForm(){
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
        const classes = useStyles();

        const categories = [
            {
                value: 'Bills & Utilities'
            },
            {
                value: 'Entertainment'
            },
            {
                value: 'Food & Drink'
            },
            {
                value: 'Groceries'
            },
            {
                value: 'Gas'
            },
            {
                value: 'Shopping'
            },
            {
                value: 'Automotive'
            },
            {
                value: 'Education'
            },
            {
                value: 'Health & Wellness'
            },
            {
                value: 'Gifts & Donations'
            },
            {
                value: 'Personal'
            },
            {
                value: 'Travel'
            },
            {
                value: 'Home'
            },
        ];

        return (
          <div>
            <FormControl className={(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-name">Name</InputLabel>
              <Input
                id="standard-adornment-name"
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
            </FormControl>
            <FormControl className={(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                step=".01"
                min = "0"
                max = "999999"
                value={this.state.amount}
                onChange={this.handleChange("amount")}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
            <TextField
                id="standard-select-category-native"
                select
                label="Category"
                className={classes.textField}
                value={this.state.category}
                onChange={this.handleChange("category")}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
              {categories.map(option => (
                  <option key={option.value} value={option.value}>
                      {option.value}
                  </option>
              ))}
            </TextField>
              {/* <TextField id="standard-adornment-category" label="Category" value={this.state.category} onChange={this.handleChange("category")}>
                <MenuItem value="10">Ten</MenuItem>
                <MenuItem value="20">Twenty</MenuItem>
              </TextField> */}
            <TextField
              id="date"
              label="Date of Expense"
              type="date"
              placeholder="YYYY-MM-DD"
              className={classes.textField}
              value={this.state.date}
              onChange={this.handleChange("date")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        );
    }
    ExpenseFormDialog(){
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
        const handleAdd = () => {
            //TODO add values to database
            var purchase = [];
            purchase = this.createExpense(this.state.name, this.state.amount, this.state.category, this.state.date);
            let userRef = db.collection("users").doc(fire.auth().currentUser.email);
            console.log(purchase, "Is going through", fire.auth().currentUser.email)
            userRef.update({
                expenses: firebase.firestore.FieldValue.arrayUnion(purchase)

            })
            .then(function(){
              console.log("updating DB")
            })
            .catch(function(error){
              console.log("Error caused by no doc existing for db. Creating new categories: ", error)
              userRef.set({
                    expenses: purchase
                }, { merge: true })
                .catch(function(error){
                  console.log("Somethings really wrong: ", error)
                });
            });
            this.setState({
                name: '',
                amount: '',
                category: '',
                date: '',
            });
            setOpen(false);
        }
        const classes = useStyles();
        return (
            <div>
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Expense</DialogTitle>
                    <DialogContent>
                        <this.NewExpenseForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAdd} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    render(){
        return(
                <div>
                    <this.ExpenseFormDialog />
                </div>
        );
    }

}
export default ExpenseForm;
