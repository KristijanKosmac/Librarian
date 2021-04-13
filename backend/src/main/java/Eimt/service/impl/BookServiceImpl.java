package Eimt.service.impl;

import Eimt.model.Author;
import Eimt.model.Book;
import Eimt.model.exceptions.AuthorNotFoundException;
import Eimt.model.exceptions.BookNotFoundExeception;
import Eimt.repository.AuthorRepository;
import Eimt.repository.BookRepository;
import Eimt.repository.CountryRepository;
import Eimt.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CountryRepository countryRepository;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository, CountryRepository countryRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public Book create(Book book){
        validateBookAndExtendWithAuthor(book);
        Long authorId = book.getAuthor().getId();
        Author author = authorRepository.findById(authorId).orElseThrow(() -> new AuthorNotFoundException(authorId));
        countryRepository.save(author.getCountry());
        authorRepository.save(book.getAuthor());
        return bookRepository.save(book);
    }

    private void validateBookAndExtendWithAuthor(Book book) {
        if (Objects.isNull(book) || Objects.isNull(book.getAuthor())) {
            throw new IllegalArgumentException();
        }
        Long authorId = book.getAuthor().getId();
        Author author = authorRepository.findById(authorId).orElseThrow(() -> new AuthorNotFoundException(authorId));
        book.setAuthor(author);
    }

    @Override
    public void deleteById(Long id){
        if(id == null ){
            throw new IllegalArgumentException();
        }
        bookRepository.deleteById(id);
    }

    @Override
    public Book update(Book book){
        if(book == null ){
            throw new IllegalArgumentException();
        }
        return bookRepository.save(book);
    }

    @Override
    public Page<Book> getAll(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("id"));
        return bookRepository.findAll(pageable);
    }

    @Override
    public void decreaseCopiesById(Long id){
        if(id == null ){
            throw new IllegalArgumentException();
        }
        Book book = bookRepository.findById(id).orElseThrow();
        book.decreaseCopies();
        bookRepository.save(book);
    };


}
