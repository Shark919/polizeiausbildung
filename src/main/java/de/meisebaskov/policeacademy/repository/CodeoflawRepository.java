package de.meisebaskov.policeacademy.repository;

import de.meisebaskov.policeacademy.domain.Codeoflaw;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Codeoflaw entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CodeoflawRepository extends JpaRepository<Codeoflaw,Long> {
    
}
