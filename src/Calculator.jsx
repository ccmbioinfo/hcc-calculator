import {
    Button,
    Container,
    Grid
} from '@material-ui/core';
import ReactDOM from "react-dom";
import React from "react";

import Header from './Header';
import Variable from './Variable';
import ResultBox from './ResultBox';
import ErrorMessage from './ErrorMessage';

import model from './model';

const labels = require("./labels.json");

document.title = labels.title + ": " + labels.info;

export default function Calculator (props) {
    const initialValues = {};
    model.variables.map((v) => {initialValues[v.name] = 0 });

    const [values, setValues] = React.useState(initialValues);
    const [score, setScore] = React.useState(Number.NaN);
    const [showScore, setShowScore] = React.useState(false);
    const [error, setError] = React.useState({});
    const [showError, setShowError] = React.useState(false);

    function populateWithSampleData() {
        setValues(model.sample_values);
    }

    function handleCloseScore() {
        setShowScore(false);
    }

    function handleCloseError() {
        setShowError(false);
        for (var v in error) {
            if (error[v]) {
                console.log(v);
                return;
            }
        }
    }

    function _isValueValid(value) {
        return typeof(value) !== "undefinded" && value !== '' && !isNaN(value);
    }

    function _prepareValues() {
        var data = [];
        var hasError = false, errorState = {};
        for (var i = 0; i < model.variables.length; i++) {
            const fieldMeta = model.variables[i];
            if (_isValueValid(values[fieldMeta.name])) {
                data.push(values[fieldMeta.name]);
            } else {
                errorState[fieldMeta.name] = hasError = true;
            }
        }
        setError(errorState);
        if (hasError) {
            setShowError(true);
            return;
        }
        return data;
    }

    function compute() {
        var data = _prepareValues()
        if (data) {
            var result = model.estimate(data);
            setScore(result);
            setShowScore(true);
        } else {
            setScore(Number.NaN);
        }
    }

    function reset() {
        setValues(initialValues);
        setError({});
    }

    return (
        <Container maxWidth="sm">
             <Header text={labels.title} info={labels.info}/>
             <Grid container direction="column" alignItems="stretch" justify="space-between" spacing={5}>
                 {model.variables.map((variable) => <Grid item key={variable.name}>
                                                               <Variable
                                                                   value={values[variable.name]}
                                                                   metadata={variable}
                                                                   key = {"variable_" + variable.name}
                                                                   error = {error[variable.name]}
                                                                   keyValue = {"variable_" + variable.name}
                                                                   isValueValid = {_isValueValid}
                                                                   updateParent={(name, value, error) => {
                                                                       setValues({
                                                                           ...values,
                                                                           [name]: value
                                                                       });
                                                                       setError({
                                                                           ...error,
                                                                           [name]: error
                                                                       });
                                                                   }}
                                                                />
                                                           </Grid>)}
                 <Grid item>
                     <Grid container spacing={2}>
                         <Grid item>
                             <Button variant="contained" color="primary" onClick={compute}>{labels.actions_submit}</Button>
                         </Grid>
                         <Grid item>
                             <Button variant="contained" color="default" onClick={reset}>{labels.actions_reset}</Button>
                         </Grid>
                         {model.sample_values && (
                             <Grid item>
                                 <Button variant="contained" color="secondary" onClick={populateWithSampleData}>{labels.actions_loadExample}</Button>
                             </Grid>
                         )}
                     </Grid>
                 </Grid>
            </Grid>
            <ResultBox label={labels.result} value={score} open={showScore} onClose={handleCloseScore}/>
            <ErrorMessage message={labels.error_wrongInput} open={showError} onClose={handleCloseError} />
        </Container>
    );
}



