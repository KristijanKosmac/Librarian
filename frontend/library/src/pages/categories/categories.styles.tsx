import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginLeft: "45%",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      maxWidth: 400,
      backgroundColor: "#fff85a",
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
      width: "100px",
    },
    pagination: {
      marginLeft: "35%",
      marginTop: "5%",
      marginBottom: "2%",
    },
  })
);

export default useStyles;
