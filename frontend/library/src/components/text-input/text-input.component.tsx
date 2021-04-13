import React from "react";
import { Modal, Button, TextField } from "@material-ui/core";
// import useStyles from "./text-input.stayle";

interface Props {
  label: string;
}

export default function TextInput(props: Props) {
  //   const classes = useStyles();

  return (
    <div>
      <label>Book title: </label>
      <TextField
        size="small"
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
    </div>
  );
}
