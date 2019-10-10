import {
    Dialog,
    DialogContent,
    makeStyles,
    Typography
} from '@material-ui/core';
import React from "react";

const useTooltipStyles = makeStyles(theme => ({
    errorMessage: {
        color: "red"
    }
}));

export default function ErrorMessage(props) {
    const classes = useTooltipStyles();
     return (<div>
        <Dialog
            maxWidth='xl'
            open={props.open}
            onClose={props.onClose}>
            <DialogContent>
                <Typography variant="body1" gutterBottom className={classes.errorMessage}>{props.message}</Typography>
            </DialogContent>
        </Dialog>
    </div>);
}
