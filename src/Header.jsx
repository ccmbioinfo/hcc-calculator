import {
    Grid,
    makeStyles,
    Tooltip,
    Typography
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ReactDOM from "react-dom";
import React from "react";

const useTooltipStyles = makeStyles(theme => ({
    tooltip: {
        color: "white",
        backgroundColor: "black",
        fontSize: 14
    }
}));
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

    return (
        <Grid container>
            <Grid item xs={"auto"}>
                <Typography variant="h1" gutterBottom className={classes.hccHeading}>{props.text}</Typography>
            </Grid>
            {props.info &&
            <Grid item xs>
                <Tooltip
                    enterTouchDelay={0}
                    title={props.info}
                    placement="bottom-start"
                    classes={useTooltipStyles()}>
                        <InfoIcon />
                </Tooltip>
            </Grid>
            }
        </Grid>);
}
