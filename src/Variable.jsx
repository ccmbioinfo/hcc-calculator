import React from 'react';
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core';

import Field from './Field';

export default function Variable(props) {
    return (
        <Grid container direction="column" alignItems="stretch">
            <Grid item>
            <Typography variant="subtitle1" gutterBottom>
                {props.metadata.label}
            </Typography>
            </Grid>
            <Grid item>
            <Field value={props.value} metadata={props.metadata} error={props.error} updateParent={props.updateParent} isValueValid={props.isValueValid} />
            </Grid>
        </Grid>
    );
}
