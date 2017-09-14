package de.meisebaskov.policeacademy.service.impl;

import de.meisebaskov.policeacademy.service.FlashcardService;
import de.meisebaskov.policeacademy.domain.Flashcard;
import de.meisebaskov.policeacademy.repository.FlashcardRepository;
import de.meisebaskov.policeacademy.repository.search.FlashcardSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

    private final FlashcardSearchRepository flashcardSearchRepository;

    public FlashcardServiceImpl(FlashcardRepository flashcardRepository, FlashcardSearchRepository flashcardSearchRepository) {
        this.flashcardRepository = flashcardRepository;
        this.flashcardSearchRepository = flashcardSearchRepository;
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
        Flashcard result = flashcardRepository.save(flashcard);
        flashcardSearchRepository.save(result);
        return result;
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
        flashcardSearchRepository.delete(id);
    }

    /**
     * Search for the flashcard corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Flashcard> search(String query) {
        log.debug("Request to search Flashcards for query {}", query);
        return StreamSupport
            .stream(flashcardSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
