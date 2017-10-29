package de.meisebaskov.policeacademy.service;

import de.meisebaskov.policeacademy.domain.Flashcard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

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

    Flashcard createFlashcard(String title, String description);

    Optional<Flashcard> getFlashcardByTitle(String title);

    Page<Flashcard> findFlashcardsByTitleIsLike(String title, Pageable pageable);

    Page<Flashcard> findFlashcardsByDescriptionContains(String title, Pageable pageable);

    /**
     *  Delete the "id" flashcard.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
