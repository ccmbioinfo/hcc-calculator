import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    makeStyles,
    Tooltip,
    Typography
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import React from "react";

const useStyles = makeStyles({
  hccHeading: {
    fontSize: '1.5rem',
    '@media (min-width:280px)': {
      fontSize: '2rem',
    },
    '@media (min-width:370px)': {
      fontSize: '2.5rem',
    },
    '@media (min-width:600px)': {
      fontSize: '3.5rem',
    },
  },
});

export default function Header (props) {
    const classes = useStyles();

    const [infoDisplayed, setInfoDisplayed] = React.useState(false);

    const handleOpen = () => {
        setInfoDisplayed(true);
    };

    const handleClose = () => {
        setInfoDisplayed(false);
    };
    return (
        <Grid container alignItems="center" justify="space-between" direction="row">
            <Grid item xs={"auto"}>
                <Typography variant="h1" gutterBottom className={classes.hccHeading}>{props.text}</Typography>
            </Grid>
            {props.info &&
            <Grid item xs={false}>
                <Tooltip
                    title={props.info}
                    placement="bottom-start"
                >
                        <InfoIcon color="primary" fontSize="large" onClick={handleOpen}/>
                </Tooltip>
               <Dialog
                 open={infoDisplayed}
                 onClose={handleClose}
                 scroll="paper"
               >
                 <DialogTitle>{props.text}</DialogTitle>
                 <DialogContent dividers>
                   <DialogContentText color="primary">
                      {props.info}
                   </DialogContentText>
                 </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="default">Close</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
            }
        </Grid>);
}
