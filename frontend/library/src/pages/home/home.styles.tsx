import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      maxWidth: 345,
      marginTop: "10px",
    },
    media: {
      height: 140,
    },
    warning: {
      color: "#ffcc00",
    },
    delete: {
      color: "#cc3300",
      float: "right",
    },
    dispalyButtons: {
      display: "flow-root",
    },
    addButton: {
      marginTop: "10px",
      maxWidth: "200px",
      marginRight: "20px",
    },
    pagination: {
      marginLeft: "35%",
      marginTop: "5%",
      marginBottom: "2%",
    },
    select: {
      width: "63%",
    },
    circularProgress: {
      position: "absolute",
      top: "40%",
      left: "50%",
    },
    bottomCard: {
      maxWidth: "500px",
      marginLeft: "55px",
    },
  })
);

export default useStyles;
