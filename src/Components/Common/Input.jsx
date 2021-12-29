import React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width: "80%",
  },
});

function Input({ label, onChangeHandler, type, value }) {
  const classes = useStyles();

  return (
    <div>
      <TextField
        onChange={(e) => onChangeHandler(e.target.value)}
        id='outlined-basic'
        label={label}
        type={type}
        value={value}
        variant='outlined'
        className={classes.root}
      />
    </div>
  );
}

export default Input;
