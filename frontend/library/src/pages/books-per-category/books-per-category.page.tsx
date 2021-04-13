import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import useStyles from "./books-per-category.styles";
import { Pagination } from "@material-ui/lab";
import bookShopApi from "../../api/bookShopApi";

import { RouteComponentProps } from "react-router";
import BookCard from "../../components/bookCard/bookCard.component";

export interface AuthorIntercace {
  id: number;
  name: string;
  surName: string;
  country: {
    id: number;
    name: string;
    continent: string;
  };
}

export interface BookInterface {
  id: string;
  name: string;
  category: string;
  author: {
    id: number;
    name: string;
    surName: string;
    country: { id: number; name: string; continent: string };
  };
  availableCopies: number;
}

export default function BooksPerCategory(props: RouteComponentProps) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const category = props.match.params as { category: string };
  const [categories, setCategories] = useState([""]);
  const [authors, setAuthors] = useState<AuthorIntercace[]>([]);
  const [books, setBooks] = useState<BookInterface[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorIntercace>({
    id: 0,
    country: { id: 0, continent: "", name: "" },
    name: "",
    surName: "",
  });
  const [bookTitle, setBookTitle] = useState("");
  const [availableCopies, setAvailableCopies] = useState(0);

  const [openBookModal, setOpenBookModal] = React.useState(false);
  const [openAuthorModal, setOpenAuthorModal] = React.useState(false);

  const [authorName, setAuthorName] = useState("");
  const [authorSurname, setAuthorSurname] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  console.log(category);

  const handleDeleteBook = async (id: string) => {
    try {
      await bookShopApi.deleteBook(id);
    } catch (error) {
      console.log();
    }

    fetch();
  };

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleChangeAuthor = (author: AuthorIntercace) => {
    setSelectedAuthor(author);
  };

  const getAuthors = async () => {
    try {
      await bookShopApi.fetchAuthors().then((data) => {
        setAuthors(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      await bookShopApi.fetchCategories().then((data) => {
        setCategories(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBooks = async () => {
    let booksTmp: BookInterface[] = [];
    try {
      await bookShopApi.fetchBooks(page - 1).then((data) => {
        booksTmp = data.data.content;
        setBooks(
          booksTmp.filter((book) => book.category === category.category)
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCopies = async (id: string) => {
    try {
      await bookShopApi.decreaseCopies(id);
    } catch (error) {
      console.log(error);
    }

    fetch();
  };

  function fetch() {
    setIsLoaded(false);
    getCategories();
    getAuthors();
    getBooks();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    getBooks();
  }, [page]);

  return isLoaded ? (
    <>
      <Typography
        color="secondary"
        component="h2"
        variant="h2"
        className={classes.title}
      >
        {category.category}
      </Typography>
      {books.length === 0 ? (
        <Typography
          color="primary"
          component="h5"
          variant="h5"
          className={classes.noBooks}
        >
          There are no books in this category !!
        </Typography>
      ) : (
        <Grid container spacing={1} style={{ marginTop: "10px" }}>
          {books.map((book, index) => (
            <BookCard
              key={index}
              id={book.id}
              index={index}
              bookAuthor={book.author}
              bookAvailableCopies={book.availableCopies}
              bookCategory={book.category}
              bookName={book.name}
              decreaseCopies={decreaseCopies}
              handleDeleteBook={handleDeleteBook}
              authors={authors}
              categories={categories}
              handleChangeCategory={handleChangeCategory}
              handleChangeAuthor={handleChangeAuthor}
              selectedCategory={selectedCategory}
              selectedAuthor={selectedAuthor}
              title={bookTitle}
              availableCopies={availableCopies}
              setAvailableCopies={setAvailableCopies}
              setBookTitle={setBookTitle}
              fetch={fetch}
            />
          ))}
        </Grid>
      )}
      <Pagination
        count={10}
        variant="outlined"
        color="primary"
        className={classes.pagination}
        onChange={(event, value) => {
          setPage(value);
        }}
      />
    </>
  ) : (
    <CircularProgress size={100} className={classes.circularProgress} />
  );
}
