import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

export default function ResultBox(props) {
    return (<div>
      <Dialog
        maxWidth='xl'
        open={props.open}
        onClose={props.onClose}
        scroll="paper"
      >
        <DialogTitle>{props.label}</DialogTitle>
        <DialogContent dividers>
            <DialogContentText variant="h1" color="primary" style={{textAlign: "center"}}>
               {parseFloat(props.value).toFixed(2)}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
}
