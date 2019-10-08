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

export default function Header (props) {
    return (
        <Grid container>
            <Grid item xs={"auto"}>
                <Typography variant={window.innerWidth >=380 && "h3" || window.innerWidth >= 280 && "h4" || "h5"} component="h1" gutterBottom>{props.text}</Typography>
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
