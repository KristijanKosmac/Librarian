package Eimt.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class BookNotFoundExeception extends RuntimeException{
    public BookNotFoundExeception(Long id) {
        super(String.format("Book with id: %d is not found", id));
    }
}
