import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./authors.styles";
import { Pagination } from "@material-ui/lab";
import bookShopApi from "../../api/bookShopApi";

export default function AuthorsPage() {
  const classes = useStyles();
  const [authors, setAuthors] = useState([""]);

  console.log(authors);
  const getCategories = async () => {
    try {
      await bookShopApi.fetchAuthors().then((data) => {
        setAuthors(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div>
        <h1 className={classes.header}>Authors</h1>
      </div>
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        {authors.map((author) => (
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h2"
                    component="h2"
                    color="primary"
                  >
                    {author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={10}
        variant="outlined"
        color="primary"
        className={classes.pagination}
      />
    </>
  );
}
