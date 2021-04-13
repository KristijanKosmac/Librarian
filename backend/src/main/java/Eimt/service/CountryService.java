package Eimt.service;

import Eimt.model.Author;
import Eimt.model.Country;
import Eimt.model.enumerations.Category;

import java.util.List;

public interface CountryService {

    Country create(Country country);

    List<Country> getAll();

}
