package Eimt.service;

import Eimt.model.Book;
import org.springframework.data.domain.Page;

import java.util.List;


public interface BookService {

    Book create(Book book);

    void deleteById(Long id);

    Book update(Book book);

    Page<Book> getAll(int page, int size);

    void decreaseCopiesById(Long id);
}
