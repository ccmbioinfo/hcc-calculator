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

    function _prepareValues(values, reportError) {
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
        setErrors(errorState);
        if (hasError && reportError) {
            setErrorDisplayed(true);
            return;
        }
        return data;
    }

    function compute(_values) {
        var data = _prepareValues(_values || values, !!_values)
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

    function useSampleData() {
        if (model.sample_values) {
          setValues(model.sample_values);
          setTimeout(function() {
            compute(model.sample_values);
          }, 500);
        }
    }

    return (
        <Dialog open={true} scroll="paper" fullWidth maxWidth={'sm'} fullScreen={fullScreen} BackdropProps={{style: { background: "transparent"}}}>
          <DialogTitle disableTypography>
             <Header text={labels.title} info={labels.info} actions={[model.sample_values && <Button color="secondary" onClick={useSampleData}>{labels.actions_loadExample}</Button>]}/>
          </DialogTitle>
          <DialogContent dividers>
             <Grid container direction="column" alignItems="stretch" justify="space-between" spacing={5} wrap="nowrap">
                 {model.variables.map((variable) => <Grid item key={variable.name}>
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



