import axios from "../custom-axios/axios";

const bookShopApi = {
  fetchBooks: (page: number) => {
    return axios.get(`/books/${page}`);
  },
  fetchCategories: () => {
    return axios.get("/books/categories");
  },
  fetchAuthors: () => {
    return axios.get("/author");
  },
  fetchCountries: () => {
    return axios.get("/countries");
  },
  addCountry: (name: string, continent: string) => {
    return axios.post("/countries", {
      name: name,
      continent: continent,
    });
  },
  addAuthor: (
    name: string,
    surName: string,
    country: { id: number; name: string; continent: string }
  ) => {
    return axios.post("/author", {
      name: name,
      surName: surName,
      country: country,
    });
  },
  addBook: (
    name: string,
    category: string,
    author: {
      id: number;
      name: string;
      surName: string;
      country: { id: number; name: string; continent: string };
    },
    availableCopies: number
  ) => {
    return axios.post("/books", {
      name: name,
      category: category,
      author: author,
      availableCopies: availableCopies,
    });
  },
  editBook: (
    id: string,
    name: string,
    category: string,
    author: {
      id: number;
      name: string;
      surName: string;
      country: { id: number; name: string; continent: string };
    },
    availableCopies: number
  ) => {
    return axios.put("/books", {
      id: id,
      name: name,
      category: category,
      author: author,
      availableCopies: availableCopies,
    });
  },
  decreaseCopies: (id: string) => {
    return axios.put(`/books/${id}/decreaseCopies`);
  },
  deleteBook: (id: string) => {
    return axios.delete(`books/${id}`);
  },
};

export default bookShopApi;
