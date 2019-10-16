import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

export default function ErrorMessage(props) {
    return (<div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        scroll="paper"
      >
        <DialogTitle>Error</DialogTitle>
        <DialogContent dividers>
          <DialogContentText color="error">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
}
