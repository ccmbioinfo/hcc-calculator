import {
    Grid,
    InputAdornment,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import ReactDOM from "react-dom";
import React from "react";


export default function Field (props) {
    function handleChange(event) {
        props.updateParent(props.metadata.name, event.target.value, !props.isValueValid(event.target.value));
    }
    switch (props.metadata.type) {
        case 'Binary' :
        case 'binary' :
            return (
            <Select
                value={props.value}
                variant="outlined"
                fullWidth
                error = {props.error}
                onChange = {handleChange}
                inputProps = {{
                    name: 'val',
                    id: props.metadata.name
                }}>
                    <MenuItem value = ""></MenuItem>
                    <MenuItem value = {1} key = {props.metadata.name + "_Option_0"}>Yes</MenuItem>
                    <MenuItem value = {0} key = {props.metadata.name + "_Option_1"}>No</MenuItem>
            </Select>
            );

        case 'List' :
        case 'list' :
            return (
            <Select
                value={props.value}
                variant="outlined"
                fullWidth
                error = {props.error}
                onChange = {handleChange}
                inputProps = {{
                    name: 'val',
                    id: props.metadata.name
                }}>
                    {props.metadata.values ? props.metadata.values.map( (entry, idx) =>
                        <MenuItem value={entry.value} key= {props.metadata.name + "_Option_" + idx}>{entry.label}</MenuItem>
                    ) : ""}
            </Select>
            );

        default:
            return (
            <TextField
                value={props.value}
                variant="outlined"
                fullWidth
                id = {props.metadata.name}
                type = "number"
                onChange = {handleChange}
                error = {props.error}
                width = "auto"
                InputProps = {{
                    endAdornment: <InputAdornment position="end">{(props.metadata.unit || "")}</InputAdornment>
                }}
            />);
    };
};
