import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    bottomCard: {
      maxWidth: "500px",
      marginLeft: "55px",
    },
  })
);

export default useStyles;
