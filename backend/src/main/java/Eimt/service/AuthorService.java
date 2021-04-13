package Eimt.service;

import Eimt.model.Author;

import java.util.List;


public interface AuthorService {

    Author create(Author author);

    List<Author> getAll();

}
