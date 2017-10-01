package de.meisebaskov.policeacademy.domain;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Document(indexName = "article")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2)
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Size(min = 2)
    @Column(name = "legaltext", nullable = false)
    private String legaltext;

    @ManyToOne
    private Codeoflaw codeoflaw;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Article title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLegaltext() {
        return legaltext;
    }

    public Article legaltext(String legaltext) {
        this.legaltext = legaltext;
        return this;
    }

    public void setLegaltext(String legaltext) {
        this.legaltext = legaltext;
    }

    public Codeoflaw getCodeoflaw() {
        return codeoflaw;
    }

    public Article codeoflaw(Codeoflaw codeoflaw) {
        this.codeoflaw = codeoflaw;
        return this;
    }

    public void setCodeoflaw(Codeoflaw codeoflaw) {
        this.codeoflaw = codeoflaw;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Article article = (Article) o;
        if (article.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), article.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", legaltext='" + getLegaltext() + "'" +
            "}";
    }
}
