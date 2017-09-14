package de.meisebaskov.policeacademy.web.rest;

import de.meisebaskov.policeacademy.PolizeiausbildungApp;

import de.meisebaskov.policeacademy.domain.Flashcard;
import de.meisebaskov.policeacademy.repository.FlashcardRepository;
import de.meisebaskov.policeacademy.service.FlashcardService;
import de.meisebaskov.policeacademy.repository.search.FlashcardSearchRepository;
import de.meisebaskov.policeacademy.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FlashcardResource REST controller.
 *
 * @see FlashcardResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PolizeiausbildungApp.class)
public class FlashcardResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private FlashcardRepository flashcardRepository;

    @Autowired
    private FlashcardService flashcardService;

    @Autowired
    private FlashcardSearchRepository flashcardSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlashcardMockMvc;

    private Flashcard flashcard;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        FlashcardResource flashcardResource = new FlashcardResource(flashcardService);
        this.restFlashcardMockMvc = MockMvcBuilders.standaloneSetup(flashcardResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Flashcard createEntity(EntityManager em) {
        Flashcard flashcard = new Flashcard()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION);
        return flashcard;
    }

    @Before
    public void initTest() {
        flashcardSearchRepository.deleteAll();
        flashcard = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlashcard() throws Exception {
        int databaseSizeBeforeCreate = flashcardRepository.findAll().size();

        // Create the Flashcard
        restFlashcardMockMvc.perform(post("/api/flashcards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flashcard)))
            .andExpect(status().isCreated());

        // Validate the Flashcard in the database
        List<Flashcard> flashcardList = flashcardRepository.findAll();
        assertThat(flashcardList).hasSize(databaseSizeBeforeCreate + 1);
        Flashcard testFlashcard = flashcardList.get(flashcardList.size() - 1);
        assertThat(testFlashcard.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testFlashcard.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the Flashcard in Elasticsearch
        Flashcard flashcardEs = flashcardSearchRepository.findOne(testFlashcard.getId());
        assertThat(flashcardEs).isEqualToComparingFieldByField(testFlashcard);
    }

    @Test
    @Transactional
    public void createFlashcardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flashcardRepository.findAll().size();

        // Create the Flashcard with an existing ID
        flashcard.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlashcardMockMvc.perform(post("/api/flashcards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flashcard)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Flashcard> flashcardList = flashcardRepository.findAll();
        assertThat(flashcardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = flashcardRepository.findAll().size();
        // set the field null
        flashcard.setTitle(null);

        // Create the Flashcard, which fails.

        restFlashcardMockMvc.perform(post("/api/flashcards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flashcard)))
            .andExpect(status().isBadRequest());

        List<Flashcard> flashcardList = flashcardRepository.findAll();
        assertThat(flashcardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = flashcardRepository.findAll().size();
        // set the field null
        flashcard.setDescription(null);

        // Create the Flashcard, which fails.

        restFlashcardMockMvc.perform(post("/api/flashcards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flashcard)))
            .andExpect(status().isBadRequest());

        List<Flashcard> flashcardList = flashcardRepository.findAll();
        assertThat(flashcardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFlashcards() throws Exception {
        // Initialize the database
        flashcardRepository.saveAndFlush(flashcard);

        // Get all the flashcardList
        restFlashcardMockMvc.perform(get("/api/flashcards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flashcard.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getFlashcard() throws Exception {
        // Initialize the database
        flashcardRepository.saveAndFlush(flashcard);

        // Get the flashcard
        restFlashcardMockMvc.perform(get("/api/flashcards/{id}", flashcard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flashcard.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFlashcard() throws Exception {
        // Get the flashcard
        restFlashcardMockMvc.perform(get("/api/flashcards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlashcard() throws Exception {
        // Initialize the database
        flashcardService.save(flashcard);

        int databaseSizeBeforeUpdate = flashcardRepository.findAll().size();

        // Update the flashcard
        Flashcard updatedFlashcard = flashcardRepository.findOne(flashcard.getId());
        updatedFlashcard
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);

        restFlashcardMockMvc.perform(put("/api/flashcards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlashcard)))
            .andExpect(status().isOk());

        // Validate the Flashcard in the database
        List<Flashcard> flashcardList = flashcardRepository.findAll();
        assertThat(flashcardList).hasSize(databaseSizeBeforeUpdate);
        Flashcard testFlashcard = flashcardList.get(flashcardList.size() - 1);
        assertThat(testFlashcard.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testFlashcard.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the Flashcard in Elasticsearch
        Flashcard flashcardEs = flashcardSearchRepository.findOne(testFlashcard.getId());
        assertThat(flashcardEs).isEqualToComparingFieldByField(testFlashcard);
    }

    @Test
    @Transactional
    public void updateNonExistingFlashcard() throws Exception {
        int databaseSizeBeforeUpdate = flashcardRepository.findAll().size();

        // Create the Flashcard

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFlashcardMockMvc.perform(put("/api/flashcards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flashcard)))
            .andExpect(status().isCreated());

        // Validate the Flashcard in the database
        List<Flashcard> flashcardList = flashcardRepository.findAll();
        assertThat(flashcardList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFlashcard() throws Exception {
        // Initialize the database
        flashcardService.save(flashcard);

        int databaseSizeBeforeDelete = flashcardRepository.findAll().size();

        // Get the flashcard
        restFlashcardMockMvc.perform(delete("/api/flashcards/{id}", flashcard.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean flashcardExistsInEs = flashcardSearchRepository.exists(flashcard.getId());
        assertThat(flashcardExistsInEs).isFalse();

        // Validate the database is empty
        List<Flashcard> flashcardList = flashcardRepository.findAll();
        assertThat(flashcardList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFlashcard() throws Exception {
        // Initialize the database
        flashcardService.save(flashcard);

        // Search the flashcard
        restFlashcardMockMvc.perform(get("/api/_search/flashcards?query=id:" + flashcard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flashcard.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Flashcard.class);
        Flashcard flashcard1 = new Flashcard();
        flashcard1.setId(1L);
        Flashcard flashcard2 = new Flashcard();
        flashcard2.setId(flashcard1.getId());
        assertThat(flashcard1).isEqualTo(flashcard2);
        flashcard2.setId(2L);
        assertThat(flashcard1).isNotEqualTo(flashcard2);
        flashcard1.setId(null);
        assertThat(flashcard1).isNotEqualTo(flashcard2);
    }
}
