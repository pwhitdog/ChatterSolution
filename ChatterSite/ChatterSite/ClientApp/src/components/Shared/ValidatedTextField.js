import React from "react";
import {useField} from "formik";
import {TextField} from "@material-ui/core";

export const ValidatedTextField = (props) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <TextField 
            {...field} 
            type={props.type}
            placeholder={props.placeholder}
            helperText={errorText}
            error={!!errorText}
            variant='outlined'
            margin="normal"
            fullWidth
        />
    )
};