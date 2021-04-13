import React from "react";
import { Modal, Button } from "@material-ui/core";
import useStyles from "./modal.style";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface Props {
  title: string;
  open: boolean;
  buttonName: string;
  setOpen: Function;
  handleClose: Function;
  body: any;
  onClick: Function;
}

export default function CustomModal(props: Props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.header}>
        <h2 className={classes.title}>{props.title}</h2>
        <HighlightOffIcon
          className={classes.icon}
          onClick={() => props.handleClose()}
        />
      </div>
      <div className={classes.body}>{props.body}</div>
      <div style={{ width: "100%" }}>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={() => props.onClick()}
        >
          {props.buttonName}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
