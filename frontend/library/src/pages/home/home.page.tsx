import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CustomModal from "../../components/modal/modal.component";
import BookCard from "../../components/bookCard/bookCard.component";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import useStyles from "./home.styles";
import { Pagination } from "@material-ui/lab";
import bookShopApi from "../../api/bookShopApi";

import AddBookBody from "../../utils/addBookBodyModal";
import AddAurhorBody from "../../utils/addAuthorBodyModal";

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

export default function Home() {
  const classes = useStyles();
  const [page, setPage] = useState(1);

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

  const handleDeleteBook = async (id: string) => {
    try {
      await bookShopApi.deleteBook(id);
      toast.success("Successfully deleted book!");
    } catch (error) {
      console.log(error);
    }

    fetch();
  };

  const decreaseCopies = async (id: string) => {
    try {
      await bookShopApi.decreaseCopies(id);
    } catch (error) {
      console.log(error);
    }

    fetch();
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
    try {
      await bookShopApi.fetchBooks(page - 1).then((data) => {
        setBooks(data.data.content);
      });
    } catch (error) {
      console.log(error);
    }
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

  const handleSubmitAuthor = async () => {
    let countries: { id: number; name: string; continent: string }[] = [];
    try {
      await bookShopApi.addCountry(country, continent);
      await bookShopApi.fetchCountries().then((data) => {
        countries = data.data;
      });

      const countryTmp = countries.find((c) => c.name === country);
      if (countryTmp) {
        await bookShopApi.addAuthor(authorName, authorSurname, countryTmp);
      }
      handleCLoseAuthorModal();
      toast.success("Successfully added author!");
    } catch (error) {
      console.log(error);
    }

    fetch();
  };

  const handleSubmitBook = async () => {
    try {
      await bookShopApi.addBook(
        bookTitle,
        selectedCategory,
        selectedAuthor!,
        availableCopies
      );

      handleClose();
      toast.success("Successfully added book!");
    } catch (error) {
      console.log(error);
    }

    fetch();
  };

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleChangeAuthor = (author: AuthorIntercace) => {
    setSelectedAuthor(author);
  };

  const handleOpen = () => {
    setAvailableCopies(0);
    setBookTitle("");
    setSelectedAuthor({
      id: 0,
      country: { id: 0, continent: "", name: "" },
      name: "",
      surName: "",
    });
    setSelectedCategory("");
    setOpenBookModal(true);
  };

  const handleClose = () => {
    setOpenBookModal(false);
  };

  const handleCLoseAuthorModal = () => {
    setOpenAuthorModal(false);
  };

  return isLoaded ? (
    <>
      <div>
        <CustomModal
          title="Add book"
          open={openBookModal}
          setOpen={setOpenBookModal}
          handleClose={handleClose}
          buttonName="Create"
          body={
            <AddBookBody
              authors={authors}
              categories={categories}
              handleChangeCategory={handleChangeCategory}
              handleChangeAuthor={handleChangeAuthor}
              selectedCategory={selectedCategory}
              selectedAuthor={selectedAuthor!}
              setAvailableCopies={setAvailableCopies}
              setBookTitle={setBookTitle}
              AvailableCopies={availableCopies}
              title={bookTitle}
            />
          }
          onClick={() => handleSubmitBook()}
        />
        <CustomModal
          title="Add Author"
          buttonName="Create"
          open={openAuthorModal}
          setOpen={setOpenBookModal}
          handleClose={handleCLoseAuthorModal}
          body={
            <AddAurhorBody
              setAuthorName={setAuthorName}
              setAuthorSurname={setAuthorSurname}
              setCountry={setCountry}
              setContinent={setContinent}
            />
          }
          onClick={() => handleSubmitAuthor()}
        />
        <Button
          size="large"
          color="primary"
          variant="contained"
          className={classes.addButton}
          onClick={() => handleOpen()}
        >
          Add Book
        </Button>
        <Button
          size="large"
          color="primary"
          variant="contained"
          className={classes.addButton}
          onClick={() => setOpenAuthorModal(true)}
        >
          Add Author
        </Button>
      </div>
      <Grid container spacing={1} style={{ marginTop: "20px" }}>
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
