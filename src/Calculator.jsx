import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import React from "react";

import Header from './Header';
import Variable from './Variable';
import ResultBox from './ResultBox';
import ErrorMessage from './ErrorMessage';

import model from './model';

const labels = require("./labels.json");

document.title = labels.title + ": " + labels.info;

export default function Calculator (props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const initialValues = {};
    model.variables.map((v) => {initialValues[v.name] = 0 });

    const [values, setValues] = React.useState(initialValues);
    const [score, setScore] = React.useState(Number.NaN);
    const [scoreDisplayed, setScoreDisplayed] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [errorDisplayed, setErrorDisplayed] = React.useState(false);

    function handleCloseScore() {
        setScoreDisplayed(false);
    }

    function handleCloseError() {
        setErrorDisplayed(false);
    }

    function _isValueValid(value) {
        return typeof(value) !== "undefinded" && value !== '' && !isNaN(value);
    }

    function _prepareValues() {
        var data = [];
        var errorState = {};
        for (var i = 0; i < model.variables.length; i++) {

            const name = model.variables[i].name;
    
            //input fields used in calcs only (e.g., pretx_lesion_number) will not have a weight
            if (!model.variables[i].weight) {
                continue;
            }

            let value;

            if (name === "pretx_afp") {
                value = +values["pretx_afp"] ? Math.log(+values["pretx_afp"]) : 0;
            } else if (name === "pretx_tbs") {
                value = Math.sqrt(
                Math.pow(+values["pretx_lesion_number"], 2) +
                    Math.pow(+values["pretx_lesion_size"], 2)
                );
            } else {
                value = values[name];
            }
            
            if (_isValueValid(value)) {
                data.push({ value, ...model.variables[i] });
            } else {
                errorState[name] = true;
            }
        }
        setErrors(errorState);
        if (Object.keys(errorState).length) {
            setErrorDisplayed(true);
            return;
        }
        return data;
    }

    function compute() {
        var data = _prepareValues()
        if (data) {
            var result = model.estimate(data);
            setScore(result);
            setScoreDisplayed(true);
        } else {
            setScore(Number.NaN);
        }
    }

    function reset() {
        setValues(initialValues);
        setErrors({});
    }

    return (
        <Dialog open={true} scroll="paper" fullWidth maxWidth={'sm'} fullScreen={fullScreen} BackdropProps={{style: { background: "transparent"}}}>
          <DialogTitle disableTypography>
             <Header text={labels.title} info={labels.info}/>
          </DialogTitle>
          <DialogContent dividers>
             <Grid container direction="column" alignItems="stretch" justify="space-between" spacing={5} wrap="nowrap">
                 {model.variables
                                .filter((v) => !!v.label)
                                .map((variable) => <Grid item key={variable.name}>
                                                               <Variable
                                                                   value = {values[variable.name]}
                                                                   metadata = {variable}
                                                                   error = {errors[variable.name]}
                                                                   isValueValid = {_isValueValid}
                                                                   updateParent = {(name, value, error) => {
                                                                       setValues({
                                                                           ...values,
                                                                           [name]: value
                                                                       });
                                                                       setErrors({
                                                                           ...errors,
                                                                           [name]: error
                                                                       });
                                                                   }}
                                                                />
                                                           </Grid>)}
            </Grid>
            <ResultBox label={labels.result_title} value={score} open={scoreDisplayed} onClose={handleCloseScore}/>
            <ErrorMessage message={labels.error_wrongInput} open={errorDisplayed} onClose={handleCloseError} />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={compute}>{labels.actions_computeScore}</Button>
            <Button variant="outlined" color="default" onClick={reset}>{labels.actions_reset}</Button>
          </DialogActions>
        </Dialog>
    );
}



