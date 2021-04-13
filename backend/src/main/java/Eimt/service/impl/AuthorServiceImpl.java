package Eimt.service.impl;
import Eimt.model.Author;
import Eimt.repository.AuthorRepository;
import Eimt.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public Author create(Author author){
        if(author == null){
            throw new IllegalArgumentException();
        }
        return authorRepository.save(author);
    }

    @Override
    public List<Author> getAll(){
        return authorRepository.findAll();
    }

}
