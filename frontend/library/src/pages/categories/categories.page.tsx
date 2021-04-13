import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./categories.styles";
import bookShopApi from "../../api/bookShopApi";
import { RouteComponentProps } from "react-router";

export default function CategoriesPage(props: RouteComponentProps) {
  const classes = useStyles();
  const [categories, setCategories] = useState([""]);

  console.log(categories);

  const getCategories = async () => {
    try {
      await bookShopApi.fetchCategories().then((data) => {
        setCategories(data.data);
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
        <h1 className={classes.header}>Categories</h1>
      </div>
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        {categories.map((category) => (
          <Grid item xs={4}>
            <Card
              className={classes.root}
              onClick={() => props.history.push(`/categories/${category}`)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h2"
                    component="h2"
                    color="primary"
                  >
                    {category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
