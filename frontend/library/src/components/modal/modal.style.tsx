import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid blue",
      borderColor: "#00695f",
      boxShadow: theme.shadows[5],
    },
    header: {
      backgroundColor: "#00695f",
      width: "100%",
      color: "white",
      height: "40px",
    },
    body: {
      padding: theme.spacing(2, 4, 3),
    },
    icon: {
      margin: "5px 5px 5px 5px",
      float: "right",
      "&:hover": {
        color: "red",
        cursor: "pointer",
      },
    },
    button: {
      float: "right",
      margin: "0px 5px 5px 0px",
    },
    title: {
      maxHeight: "40px",
      margin: "0",
      float: "left",
      marginLeft: "5px",
    },
  })
);

export default useStyles;
