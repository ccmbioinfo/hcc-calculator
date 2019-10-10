import React from 'react';
import {
    Container,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';

import Field from './Field';

const useLabelStyles = makeStyles(theme => ({
    labelContainer: {
        display: "block !important"
    }
}));

export default function Variable(props) {
    const classes = useLabelStyles();
    return (
        <Grid container direction="column" alignItems="stretch">
            <Grid item>
            <Typography variant="subtitle1" gutterBottom className={classes.labelContainer}>
                {props.metadata.label}
            </Typography>
            </Grid>
            <Grid item>
            <Field value={props.value} metadata={props.metadata} key={props.keyValue + "_Field"} error = {props.error} updateParent={props.updateParent} isValueValid={props.isValueValid} />
            </Grid>
        </Grid>
    );
}
