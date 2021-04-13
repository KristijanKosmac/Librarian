package Eimt.service.impl;

import Eimt.model.Author;
import Eimt.model.Country;
import Eimt.model.exceptions.CountryNotFoundException;
import Eimt.repository.AuthorRepository;
import Eimt.repository.CountryRepository;
import Eimt.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public Country create(Country country){
        if(country == null){
            throw new IllegalArgumentException();
        }
        return countryRepository.save(country);
    }

    @Override
    public List<Country> getAll(){
        return countryRepository.findAll();
    }

}
