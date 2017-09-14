package de.meisebaskov.policeacademy.repository.search;

import de.meisebaskov.policeacademy.domain.Flashcard;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Flashcard entity.
 */
public interface FlashcardSearchRepository extends ElasticsearchRepository<Flashcard, Long> {
}
