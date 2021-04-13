package Eimt.web.restController;

import Eimt.model.Author;
import Eimt.model.Country;
import Eimt.service.impl.AuthorServiceImpl;
import Eimt.service.impl.CountryServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/countries")
public class CountryRestController {
    public final CountryServiceImpl countryService;

    public CountryRestController(CountryServiceImpl countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<Country> fetchCountries() { return this.countryService.getAll(); }

    @PostMapping
    public ResponseEntity<Country> createCountry(@RequestBody Country country){
        return ResponseEntity.ok(countryService.create(country));
    }

}
