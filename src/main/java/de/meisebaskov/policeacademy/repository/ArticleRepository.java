package de.meisebaskov.policeacademy.repository;

import de.meisebaskov.policeacademy.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {

    Page<Article> findArticlesByCodeoflawShortTitle(String shorttitle, Pageable pageable);

}
