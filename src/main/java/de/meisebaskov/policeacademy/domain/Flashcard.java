package de.meisebaskov.policeacademy.domain;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "flashcard")
@Document(indexName = "flashcard")
public class Flashcard implements Serializable {

    private static final long serialVersionUID = 1L;

    public Flashcard(String title, String description, String category){
        this.title = title;
        this.description = description;
        this.category = category;
    }

    public Flashcard(){
        this.title = "DEFAULT";
        this.description = "DEFAULT";
        this.category = "DEFAULT";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 4)
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Size(min = 4)
    @Column(name = "category", nullable = false)
    private String category;

    @NotNull
    @Size(min = 4)
    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Flashcard title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public String getDescription() {
        return description;
    }

    public Flashcard description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Flashcard flashcard = (Flashcard) o;
        if (flashcard.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flashcard.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Flashcard{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", category='" + getCategory() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
