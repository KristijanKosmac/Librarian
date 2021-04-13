package Eimt.web.restController;

import Eimt.model.Book;
import Eimt.model.enumerations.Category;
import Eimt.service.impl.BookServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookRestController {
    public final BookServiceImpl bookService;

    public BookRestController(BookServiceImpl bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> fetchBookCategories() {
        return ResponseEntity.ok(List.of(Category.values()));
    }

    @GetMapping("/{page}")
    public Page<Book> fetchBooks(@PathVariable int page) {
        return this.bookService.getAll(page, 5);
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book){
       return ResponseEntity.ok(bookService.create(book));
    }

    @PutMapping
    public void updateBook(@RequestBody Book book){
        this.bookService.update(book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable long id){
        this.bookService.deleteById(id);
    }

    @PutMapping("/{id}/decreaseCopies")
    public void decreaseCopiesByiD(@PathVariable long id ){
        this.bookService.decreaseCopiesById(id);
    }

}
