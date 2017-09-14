package de.meisebaskov.policeacademy.service.dto;

import de.meisebaskov.policeacademy.domain.Flashcard;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A DTO representing a user, with his authorities.
 */
public class FlashcardDTO {

    private long id;

    @NotNull
    @Size(min = 1, max = 50)

    private String title;

    @Size(max = 500)
    private String description;

    public FlashcardDTO() {
        // Empty constructor needed for Jackson.
    }

    public FlashcardDTO(Flashcard flashcard) {
        this.id = flashcard.getId();
        this.title = flashcard.getTitle();
        this.description = flashcard.getDescription();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    //Lowercase the login before saving it in database
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    //Lowercase the login before saving it in database
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Flashcard{" +
            "title='" + title + '\'' +
            ", description='" + description + '\'' +
            "}";
    }
}
