package Eimt.web.restController;

import Eimt.model.Author;
import Eimt.model.Book;
import Eimt.service.AuthorService;
import Eimt.service.impl.AuthorServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/author")
public class AuthorRestController {
    public final AuthorServiceImpl authorService;

    public AuthorRestController(AuthorServiceImpl authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public List<Author> fetchAuthors() { return this.authorService.getAll(); }

    @PostMapping
    public ResponseEntity<Author> createAuthor(@RequestBody Author author){
        return ResponseEntity.ok(authorService.create(author));
    }
}

