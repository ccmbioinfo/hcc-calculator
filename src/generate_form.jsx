const config = {
	title: "HCC Calculator",
	info: "A post-transplant hepatocellular carcinoma (HCC) recurrence calculator using a machine-learning algorithm mapped on pre-operative patient and tumor characteristics",
	roundoff: 2
}

const variables = [{
	label: "Pre-transplant neutrophil count",
	name: "nCnt",
	type: "Float",
	display: "Input",
	weight: 0.1
},{
	label: "Number of bridging treatments",
	name: "nBT",
	type: "Integer",
	display: "Dropdown",
	upper: 8,
	weight: 0.2
},{
	label: "Number of PEI treatments",
	name: "nPEI",
	type: "Integer",
	display: "Dropdown",
	upper: 12,
	weight: 0.3
},{
	label: "Size of largest lesion at time of listing",
	name: "lSize",
	type: "Float",
	display: "Input",
	weight: 0.4
},{
	label: "Total tumor diameter at the time of listing",
	name: "tDiameter",
	type: "Float",
	display: "Input",
	weight: 0.5
}];

import React from "react";
import ReactDOM from "react-dom";
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

const useSelectStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	select: {
		minWidth: 320
	},
}));

const useTextFieldStyles = makeStyles(theme => ({
	textfield: {
		minWidth: 320
	}
}));

const useButtonStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
  	},
  	input: {
    	display: 'none'
  	},
}));

const useTooltipStyles = makeStyles(theme => ({
  	tooltip: {
    	color: "white",
    	backgroundColor: "black"
  	}
}));

function EnterData(props) {
	const [val, setVal] = React.useState('');
	function handleChange(event) {
		setVal(event.target.value);
		props.updateParent(props.metadata.name, event.target.value);
	}

	if (props.metadata.display == "Input") {
		const textfield_classes = useTextFieldStyles();
		return (
			<TextField
				className={textfield_classes.textfield}
				id={props.metadata.name}
				type="number"
				onChange={handleChange}
				error={props.err}
				margin="dense"
				width="auto"/>);
	} else {
		const select_classes = useSelectStyles();
		return (
			<Select
				className={select_classes.select}
				value={val}
				error={props.err}
				onChange={handleChange}
				inputProps={{
					name: 'val',
					id: props.metadata.name
				}}>
					{Array.from(Array(props.metadata.upper).keys()).map(
						(num) => 
						<MenuItem value={num+1} key={props.metadata.name + " Option " + num}>{num+1}</MenuItem>)}
			</Select>
		);
	}
}

function Field(props) {
	return (
		<Grid item>
			<Grid container direction="column" spacing={0}>
				<Grid item>
					<Typography variant="subtitle1" gutterBottom>
						{props.metadata.label}
					</Typography>
				</Grid>
				<Grid item>
					<EnterData metadata={props.metadata} key={props.keyValue+"_EnterData"} err={props.err} updateParent={props.updateParent} />
				</Grid>
			</Grid>
		</Grid>
	);
}

function ComputeHccScore(props) {
	const classes = useButtonStyles();
	const [sum, setSum] = React.useState(-1);
	const [open, setOpen] = React.useState(false);

	const [errDialog, setErrDialog] = React.useState({
		show: false,
		message: ""
	});

	function handleClose() {
		setOpen(false);
	}

	function handleErrDialogClose() {
		setErrDialog({show: false, message: ""});
	}

	function compute() {
		var calc_sum = 0;
		var err_check = 0;
		var newErrorState = Array.from({length: props.fields_info.length}, (v, k) => false);

		for (var i = 0; i < props.fields_info.length; i++) {
			const field = props.fields_info[i];
			const val = (field.type == "Float" ? parseFloat(props.getValue(field.name)) : parseInt(props.getValue(field.name)));
			if (!props.isSomeValueEntered(field.name) || isNaN(val)) {
				err_check = -1;
				newErrorState[i] = true;
			} else {
				newErrorState[i] = false;
			}
			calc_sum += val * field.weight;
		}

		if (err_check == 0) {
			setSum(calc_sum);
			setOpen(true);
		}
		// Feel free to add any error reporting via: 
		// setErrDialog({show: true, message: "Your message here"});
		props.setErrorState(newErrorState);
	}

	return (
		<div>
			<Button variant="contained" color="primary" className={classes.button} onClick={compute}>Compute HCC Score</Button>
			<Dialog
				maxWidth='xl'
				open={open}
				onClose={handleClose}>
				<DialogContent>
					<Typography variant="overline" display="block" gutterBottom>HCC RECURRENCE SCORE</Typography>
					<Typography variant="h1" component="h2" gutterBottom>
						{(Math.round(sum * Math.pow(10, config.roundoff)) / Math.pow(10, config.roundoff)).toString()+"%"}
					</Typography>
				</DialogContent>
			</Dialog>
			<Dialog open={errDialog.show} onClose={handleErrDialogClose}>
				<DialogContent>
					<Typography variant="body1" gutterBottom>{errDialog.message}</Typography>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function Info_button() {
	const tooltip_classes = useTooltipStyles();
	return (
		<Tooltip 
			enterTouchDelay={0}
			title={config.info}
			placement="bottom-start"
			classes={tooltip_classes}>
			<InfoIcon />
		</Tooltip>);
}

class Fields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorState: Array.from({length: props.fields_info.length}, (v, k) => false),
			values: {}
		};
	}

	render() {
		return (
			<Grid container direction="column" alignItems="center">
			<Grid item>

			<Grid container direction="column" justify="space-between" alignItems="flex-start" spacing={3}>

  			<Grid item>
  				<Grid container>
					<Grid item xs={"auto"}>
						<Typography variant="h3" gutterBottom>{config.title}</Typography>
					</Grid>
					<Grid item xs>
						<Info_button />
					</Grid>
				</Grid>
			</Grid>

			<Grid item>
				<Grid container direction="column" alignItems="flex-start" justify="space-between" spacing={8}>			
					{this.props.fields_info.map(
						(variable, idx) => 
						<Field 
							metadata={variable} 
							key={"field_"+variable.name} 
							err={this.state.errorState[idx]}
							keyValue={"field_"+variable.name} 
							updateParent={(name, value) => {
								this.setState({
									values: {
										...this.state.values,
										[name]: value
									}
								});
							}}
						/>)}
				</Grid>
			</Grid>

			<Grid item>
				<ComputeHccScore 
					fields_info={this.props.fields_info}
					setErrorState={(newErrorState) => {
						this.setState({
							errorState: newErrorState
						});
					}}
					isSomeValueEntered={(name) => {
						return this.state.values.hasOwnProperty(name);
					}}
					getValue={(name) => {
						return this.state.values[name];
					}}
				/>
			</Grid>

			</Grid>

			</Grid>
			</Grid>
		);
	}
}

const domContainer = document.querySelector('#form');
ReactDOM.render(
	<Fields fields_info={variables} />,
	domContainer
);
