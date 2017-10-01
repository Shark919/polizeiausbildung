package de.meisebaskov.policeacademy.service.impl;

import de.meisebaskov.policeacademy.service.CodeoflawService;
import de.meisebaskov.policeacademy.domain.Codeoflaw;
import de.meisebaskov.policeacademy.repository.CodeoflawRepository;
import de.meisebaskov.policeacademy.repository.search.CodeoflawSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Codeoflaw.
 */
@Service
@Transactional
public class CodeoflawServiceImpl implements CodeoflawService{

    private final Logger log = LoggerFactory.getLogger(CodeoflawServiceImpl.class);

    private final CodeoflawRepository codeoflawRepository;

    private final CodeoflawSearchRepository codeoflawSearchRepository;

    public CodeoflawServiceImpl(CodeoflawRepository codeoflawRepository, CodeoflawSearchRepository codeoflawSearchRepository) {
        this.codeoflawRepository = codeoflawRepository;
        this.codeoflawSearchRepository = codeoflawSearchRepository;
    }

    /**
     * Save a codeoflaw.
     *
     * @param codeoflaw the entity to save
     * @return the persisted entity
     */
    @Override
    public Codeoflaw save(Codeoflaw codeoflaw) {
        log.debug("Request to save Codeoflaw : {}", codeoflaw);
        Codeoflaw result = codeoflawRepository.save(codeoflaw);
        codeoflawSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the codeoflaws.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Codeoflaw> findAll() {
        log.debug("Request to get all Codeoflaws");
        return codeoflawRepository.findAll();
    }

    /**
     *  Get one codeoflaw by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Codeoflaw findOne(Long id) {
        log.debug("Request to get Codeoflaw : {}", id);
        return codeoflawRepository.findOne(id);
    }

    /**
     *  Delete the  codeoflaw by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Codeoflaw : {}", id);
        codeoflawRepository.delete(id);
        codeoflawSearchRepository.delete(id);
    }

    /**
     * Search for the codeoflaw corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Codeoflaw> search(String query) {
        log.debug("Request to search Codeoflaws for query {}", query);
        return StreamSupport
            .stream(codeoflawSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
