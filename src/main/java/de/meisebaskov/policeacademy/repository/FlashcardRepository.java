package de.meisebaskov.policeacademy.repository;

import de.meisebaskov.policeacademy.domain.Flashcard;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Flashcard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard,Long> {
    
}
