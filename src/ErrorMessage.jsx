import {
    Dialog,
    DialogContent,
    Typography
} from '@material-ui/core';
import React from "react";

export default function ErrorMessage(props) {
     return (<div>
        <Dialog
            maxWidth='xl'
            open={props.open}
            onClose={props.onClose}>
            <DialogContent>
                <Typography gutterBottom color="error">{props.message}</Typography>
            </DialogContent>
        </Dialog>
    </div>);
}
