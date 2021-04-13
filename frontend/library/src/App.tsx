import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Navbar from "./components/navbar/navbar.component";
import Homepage from "./pages/home/home.page";

import { Container } from "@material-ui/core";
import CategoriesPage from "./pages/categories/categories.page";
import Authorspage from "./pages/authors/authors.page";
import BooksPerCategory from "./pages/books-per-category/books-per-category.page";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

{
  /* Same as */
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00695f",
    },
    secondary: {
      main: "#76ff03",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          // marginTop: theme.spacing(8),
          height: "100vh",
          flexDirection: "column",
          backgroundColor: "#F8F8F8",
        }}
      >
        <Navbar />
        <Container maxWidth="lg">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
          />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/categories" exact component={CategoriesPage} />
            <Route
              path="/categories/:category"
              exact
              component={BooksPerCategory}
            />
            {/* <Route path="/author" component={Authorspage} /> */}
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
