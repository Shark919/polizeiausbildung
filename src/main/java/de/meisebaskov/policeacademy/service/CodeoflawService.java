package de.meisebaskov.policeacademy.service;

import de.meisebaskov.policeacademy.domain.Codeoflaw;
import java.util.List;

/**
 * Service Interface for managing Codeoflaw.
 */
public interface CodeoflawService {

    /**
     * Save a codeoflaw.
     *
     * @param codeoflaw the entity to save
     * @return the persisted entity
     */
    Codeoflaw save(Codeoflaw codeoflaw);

    /**
     *  Get all the codeoflaws.
     *
     *  @return the list of entities
     */
    List<Codeoflaw> findAll();

    /**
     *  Get the "id" codeoflaw.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Codeoflaw findOne(Long id);

    /**
     *  Delete the "id" codeoflaw.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the codeoflaw corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<Codeoflaw> search(String query);
}
