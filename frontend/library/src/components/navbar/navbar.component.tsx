import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./navbar.styles";

import logo from "../../assets/logo.jpg";
import { RouteComponentProps, withRouter } from "react-router-dom";

function Navbar(props: RouteComponentProps) {
  const classes = useStyles();

  return (
    <>
      {/* <img src={logo} className={classes.logo} /> */}
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Button
            color="inherit"
            className={classes.categoriesButton}
            onClick={() => props.history.push("/")}
          >
            <b>Books</b>
          </Button>
          <Button
            color="inherit"
            className={classes.categoriesButton}
            onClick={() => props.history.push("/categories")}
          >
            <b>Categories</b>
          </Button>
          {/* <Button
            color="inherit"
            className={classes.categoriesButton}
            onClick={() => props.history.push("/author")}
          >
            <b>Authors</b>
          </Button> */}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withRouter(Navbar);
