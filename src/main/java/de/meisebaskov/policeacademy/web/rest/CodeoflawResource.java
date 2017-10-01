package de.meisebaskov.policeacademy.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.meisebaskov.policeacademy.domain.Codeoflaw;
import de.meisebaskov.policeacademy.service.CodeoflawService;
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
 * REST controller for managing Codeoflaw.
 */
@RestController
@RequestMapping("/api")
public class CodeoflawResource {

    private final Logger log = LoggerFactory.getLogger(CodeoflawResource.class);

    private static final String ENTITY_NAME = "codeoflaw";

    private final CodeoflawService codeoflawService;

    public CodeoflawResource(CodeoflawService codeoflawService) {
        this.codeoflawService = codeoflawService;
    }

    /**
     * POST  /codeoflaws : Create a new codeoflaw.
     *
     * @param codeoflaw the codeoflaw to create
     * @return the ResponseEntity with status 201 (Created) and with body the new codeoflaw, or with status 400 (Bad Request) if the codeoflaw has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/codeoflaws")
    @Timed
    public ResponseEntity<Codeoflaw> createCodeoflaw(@Valid @RequestBody Codeoflaw codeoflaw) throws URISyntaxException {
        log.debug("REST request to save Codeoflaw : {}", codeoflaw);
        if (codeoflaw.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new codeoflaw cannot already have an ID")).body(null);
        }
        Codeoflaw result = codeoflawService.save(codeoflaw);
        return ResponseEntity.created(new URI("/api/codeoflaws/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /codeoflaws : Updates an existing codeoflaw.
     *
     * @param codeoflaw the codeoflaw to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated codeoflaw,
     * or with status 400 (Bad Request) if the codeoflaw is not valid,
     * or with status 500 (Internal Server Error) if the codeoflaw couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/codeoflaws")
    @Timed
    public ResponseEntity<Codeoflaw> updateCodeoflaw(@Valid @RequestBody Codeoflaw codeoflaw) throws URISyntaxException {
        log.debug("REST request to update Codeoflaw : {}", codeoflaw);
        if (codeoflaw.getId() == null) {
            return createCodeoflaw(codeoflaw);
        }
        Codeoflaw result = codeoflawService.save(codeoflaw);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, codeoflaw.getId().toString()))
            .body(result);
    }

    /**
     * GET  /codeoflaws : get all the codeoflaws.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of codeoflaws in body
     */
    @GetMapping("/codeoflaws")
    @Timed
    public List<Codeoflaw> getAllCodeoflaws() {
        log.debug("REST request to get all Codeoflaws");
        return codeoflawService.findAll();
    }

    /**
     * GET  /codeoflaws/:id : get the "id" codeoflaw.
     *
     * @param id the id of the codeoflaw to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the codeoflaw, or with status 404 (Not Found)
     */
    @GetMapping("/codeoflaws/{id}")
    @Timed
    public ResponseEntity<Codeoflaw> getCodeoflaw(@PathVariable Long id) {
        log.debug("REST request to get Codeoflaw : {}", id);
        Codeoflaw codeoflaw = codeoflawService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(codeoflaw));
    }

    /**
     * DELETE  /codeoflaws/:id : delete the "id" codeoflaw.
     *
     * @param id the id of the codeoflaw to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/codeoflaws/{id}")
    @Timed
    public ResponseEntity<Void> deleteCodeoflaw(@PathVariable Long id) {
        log.debug("REST request to delete Codeoflaw : {}", id);
        codeoflawService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/codeoflaws?query=:query : search for the codeoflaw corresponding
     * to the query.
     *
     * @param query the query of the codeoflaw search
     * @return the result of the search
     */
    @GetMapping("/_search/codeoflaws")
    @Timed
    public List<Codeoflaw> searchCodeoflaws(@RequestParam String query) {
        log.debug("REST request to search Codeoflaws for query {}", query);
        return codeoflawService.search(query);
    }

}
