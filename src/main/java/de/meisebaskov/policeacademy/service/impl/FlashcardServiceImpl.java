package de.meisebaskov.policeacademy.service.impl;

import de.meisebaskov.policeacademy.service.FlashcardService;
import de.meisebaskov.policeacademy.domain.Flashcard;
import de.meisebaskov.policeacademy.repository.FlashcardRepository;
import de.meisebaskov.policeacademy.repository.search.FlashcardSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Flashcard.
 */
@Service
@Transactional
public class FlashcardServiceImpl implements FlashcardService{
    private final Logger log = LoggerFactory.getLogger(FlashcardServiceImpl.class);

    private final FlashcardRepository flashcardRepository;

    public FlashcardServiceImpl(FlashcardRepository flashcardRepository) {
        this.flashcardRepository = flashcardRepository;
    }

    /**
     * Save a flashcard.
     *
     * @param flashcard the entity to save
     * @return the persisted entity
     */
    @Override
    public Flashcard save(Flashcard flashcard) {
        log.debug("Request to save Flashcard : {}", flashcard);
        return flashcardRepository.save(flashcard);
    }

    /**
     *  Get all the flashcards.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Flashcard> findAll() {
        log.debug("Request to get all Flashcards");
        return flashcardRepository.findAll();
    }

    /**
     *  Get one flashcard by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Flashcard findOne(Long id) {
        log.debug("Request to get Flashcard : {}", id);
        return flashcardRepository.findOne(id);
    }

    /**
     *  Delete the  flashcard by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Flashcard : {}", id);
        flashcardRepository.delete(id);
    }

    public Flashcard createFlashcard(String title, String category, String description) {
        Flashcard newFlashcard = new Flashcard(title, category, description);
        flashcardRepository.save(newFlashcard);
        log.debug("Created Information for Flashcard: {}", newFlashcard);
        return newFlashcard;
    }

    public Optional<Flashcard> getFlashcardByTitle(String title) {
        return flashcardRepository.findOneByTitle(title);
    }

    public Optional<Flashcard> getFlashcardByDescription(String description) {
        return flashcardRepository.findOneByDescriptionIsContaining(description);
    }

    public Page<Flashcard> findFlashcardsByTitleIsLike(String title, Pageable pageable){
        return flashcardRepository.findFlashcardsByTitleIsLike(title, pageable);
    }
    public Page<Flashcard> findFlashcardsByDescriptionContains(String title, Pageable pageable){
        return flashcardRepository.findFlashcardsByDescriptionContains(title, pageable);
    }

    public Page<Flashcard> findFlashcardsByDescriptionIsLikeOrTitleIsLike(String query, Pageable pageable){
        return flashcardRepository.findFlashcardsByDescriptionIsLikeOrTitleIsLike(query, pageable);
    }

}
