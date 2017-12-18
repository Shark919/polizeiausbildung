package de.meisebaskov.policeacademy.repository;

import de.meisebaskov.policeacademy.domain.Flashcard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;


/**
 * Spring Data JPA repository for the Flashcard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard,Long> {
    Optional<Flashcard> findOneByTitle(String title);

    Optional<Flashcard> findOneByDescriptionIsContaining(String description);

    Page<Flashcard> findFlashcardsByTitleIsLike(String description, Pageable pageable);
    Page<Flashcard> findFlashcardsByDescriptionContains(String description, Pageable pageable);
    Page<Flashcard> findFlashcardsByDescriptionIsLikeOrTitleIsLike(String query, Pageable pageable);

}
