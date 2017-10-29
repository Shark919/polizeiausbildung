package de.meisebaskov.policeacademy.service.impl;

import de.meisebaskov.policeacademy.service.ArticleService;
import de.meisebaskov.policeacademy.domain.Article;
import de.meisebaskov.policeacademy.repository.ArticleRepository;
import de.meisebaskov.policeacademy.repository.search.ArticleSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Article.
 */
@Service
@Transactional
public class ArticleServiceImpl implements ArticleService{

    private final Logger log = LoggerFactory.getLogger(ArticleServiceImpl.class);

    private final ArticleRepository articleRepository;

    private final ArticleSearchRepository articleSearchRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository, ArticleSearchRepository articleSearchRepository) {
        this.articleRepository = articleRepository;
        this.articleSearchRepository = articleSearchRepository;
    }

    /**
     * Save a article.
     *
     * @param article the entity to save
     * @return the persisted entity
     */
    @Override
    public Article save(Article article) {
        log.debug("Request to save Article : {}", article);
        Article result = articleRepository.save(article);
        articleSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the articles.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Article> findAll() {
        log.debug("Request to get all Articles");
        return articleRepository.findAll();
    }

    /**
     *  Get one article by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Article findOne(Long id) {
        log.debug("Request to get Article : {}", id);
        return articleRepository.findOne(id);
    }

    /**
     *  Delete the  article by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Article : {}", id);
        articleRepository.delete(id);
        articleSearchRepository.delete(id);
    }

    /**
     * Search for the article corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Article> search(String query) {
        log.debug("Request to search Articles for query {}", query);
        return StreamSupport
            .stream(articleSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    public Page<Article> findTop10000ArticlesByCodeoflawShortTitle(String shorttitle, Pageable pageable){
        return articleRepository.findTop10000ArticlesByCodeoflawShortTitle(shorttitle, pageable);
    }

    public Page<Article> findArticlesByLegaltextContainingOrTitleContainingOrCodeoflawContaining(String keyword, Pageable pageable){
        return articleRepository.findArticlesByLegaltextContaining(keyword, pageable);
    }
}
