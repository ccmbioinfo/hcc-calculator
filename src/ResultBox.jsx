import { 
    Dialog,
    DialogContent,
    Typography
} from '@material-ui/core';
import ReactDOM from "react-dom";
import React from "react";

export default function ResultBox(props) {
    return (<div>
        <Dialog
            maxWidth='xl'
            open={props.open}
            onClose={props.onClose}>
            <DialogContent>
                <Typography variant="overline" display="block" gutterBottom>{props.label}</Typography>
                <Typography variant="h1" component="h2" gutterBottom>
                    {parseFloat(props.value).toFixed(2)}
                </Typography>
            </DialogContent>
        </Dialog>
    </div>);
}
