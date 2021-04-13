import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      //height: "50px",
      width: "50px",
    },
    categoriesButton: {
      marginLeft: "10px",
    },
  })
);

export default useStyles;
