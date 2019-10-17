import {
    Grid,
    InputAdornment,
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
            return (
            <Select
                value = {props.value}
                variant = "outlined"
                fullWidth
                error = {props.error}
                onChange = {handleChange}
            >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
            </Select>
            );

        case 'List' :
            return (
            <Select
                value = {props.value}
                variant = "outlined"
                fullWidth
                error = {props.error}
                onChange = {handleChange}
            >
                    {props.metadata.values ? props.metadata.values.map( (entry, idx) =>
                        <MenuItem value={entry.value} key={props.metadata.name + "_Option_" + idx}>{entry.label}</MenuItem>
                    ) : ""}
            </Select>
            );

        default:
            return (
            <TextField
                value = {props.value}
                variant = "outlined"
                fullWidth
                type = "number"
                onChange = {handleChange}
                error = {props.error}
                InputProps = {{
                    endAdornment: <InputAdornment position="end">{(props.metadata.unit || "")}</InputAdornment>
                }}
            />);
    };
};
