import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from "@material-ui/core";

export default function ResultBox({ label, onClose, open, value }) {
    return (
        <div>
            <Dialog maxWidth="xl" open={open} onClose={onClose} scroll="paper">
                <DialogTitle>{label}</DialogTitle>
                <DialogContent dividers>
                    {value.length && (
                        <Grid container wrap="nowrap" direction="row">
                            <Grid item container direction="column">
                                <Typography>
                                    <strong>Time</strong>
                                </Typography>
                                {value.map((v, i) => (
                                    <Typography key={i}>{v.label}</Typography>
                                ))}
                            </Grid>
                            <Grid item container direction="column">
                                <Typography>
                                    <strong>Probability</strong>
                                </Typography>
                                {value.map((v, i) => (
                                    <Typography key={i}>
                                        {v.survival}
                                    </Typography>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
