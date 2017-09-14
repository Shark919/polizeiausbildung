package de.meisebaskov.policeacademy.service;

import de.meisebaskov.policeacademy.domain.Flashcard;
import java.util.List;

/**
 * Service Interface for managing Flashcard.
 */
public interface FlashcardService {

    /**
     * Save a flashcard.
     *
     * @param flashcard the entity to save
     * @return the persisted entity
     */
    Flashcard save(Flashcard flashcard);

    /**
     *  Get all the flashcards.
     *
     *  @return the list of entities
     */
    List<Flashcard> findAll();

    /**
     *  Get the "id" flashcard.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Flashcard findOne(Long id);

    /**
     *  Delete the "id" flashcard.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the flashcard corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<Flashcard> search(String query);
}
