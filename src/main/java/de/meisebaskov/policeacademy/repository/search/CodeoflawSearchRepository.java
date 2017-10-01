package de.meisebaskov.policeacademy.repository.search;

import de.meisebaskov.policeacademy.domain.Codeoflaw;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Codeoflaw entity.
 */
public interface CodeoflawSearchRepository extends ElasticsearchRepository<Codeoflaw, Long> {
}
