package de.meisebaskov.policeacademy.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.meisebaskov.policeacademy.domain.Flashcard;
import de.meisebaskov.policeacademy.service.FlashcardService;
import de.meisebaskov.policeacademy.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Flashcard.
 */
@RestController
@RequestMapping("/api")
public class FlashcardResource {

    private final Logger log = LoggerFactory.getLogger(FlashcardResource.class);

    private static final String ENTITY_NAME = "flashcard";

    private final FlashcardService flashcardService;

    public FlashcardResource(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    /**
     * POST  /flashcards : Create a new flashcard.
     *
     * @param flashcard the flashcard to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flashcard, or with status 400 (Bad Request) if the flashcard has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flashcards")
    @Timed
    public ResponseEntity<Flashcard> createFlashcard(@Valid @RequestBody Flashcard flashcard) throws URISyntaxException {
        log.debug("REST request to save Flashcard : {}", flashcard);
        if (flashcard.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new flashcard cannot already have an ID")).body(null);
        }
        Flashcard result = flashcardService.save(flashcard);
        return ResponseEntity.created(new URI("/api/flashcards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flashcards : Updates an existing flashcard.
     *
     * @param flashcard the flashcard to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flashcard,
     * or with status 400 (Bad Request) if the flashcard is not valid,
     * or with status 500 (Internal Server Error) if the flashcard couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flashcards")
    @Timed
    public ResponseEntity<Flashcard> updateFlashcard(@Valid @RequestBody Flashcard flashcard) throws URISyntaxException {
        log.debug("REST request to update Flashcard : {}", flashcard);
        if (flashcard.getId() == null) {
            return createFlashcard(flashcard);
        }
        Flashcard result = flashcardService.save(flashcard);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flashcard.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flashcards : get all the flashcards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flashcards in body
     */
    @GetMapping("/flashcards")
    @Timed
    public List<Flashcard> getAllFlashcards() {
        log.debug("REST request to get all Flashcards");
        return flashcardService.findAll();
    }

    /**
     * GET  /flashcards/:id : get the "id" flashcard.
     *
     * @param id the id of the flashcard to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flashcard, or with status 404 (Not Found)
     */
    @GetMapping("/flashcards/{id}")
    @Timed
    public ResponseEntity<Flashcard> getFlashcard(@PathVariable Long id) {
        log.debug("REST request to get Flashcard : {}", id);
        Flashcard flashcard = flashcardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(flashcard));
    }

    /**
     * DELETE  /flashcards/:id : delete the "id" flashcard.
     *
     * @param id the id of the flashcard to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flashcards/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlashcard(@PathVariable Long id) {
        log.debug("REST request to delete Flashcard : {}", id);
        flashcardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/flashcards?query=:query : search for the flashcard corresponding
     * to the query.
     *
     * @param query the query of the flashcard search
     * @return the result of the search
     */
    @GetMapping("/_search/flashcards")
    @Timed
    public List<Flashcard> searchFlashcards(@RequestParam String query) {
        log.debug("REST request to search Flashcards for query {}", query);
        return flashcardService.search(query);
    }

}
