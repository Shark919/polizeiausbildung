package de.meisebaskov.policeacademy.web.rest;

import de.meisebaskov.policeacademy.PolizeiausbildungApp;

import de.meisebaskov.policeacademy.domain.Codeoflaw;
import de.meisebaskov.policeacademy.repository.CodeoflawRepository;
import de.meisebaskov.policeacademy.service.CodeoflawService;
import de.meisebaskov.policeacademy.repository.search.CodeoflawSearchRepository;
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
 * Test class for the CodeoflawResource REST controller.
 *
 * @see CodeoflawResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PolizeiausbildungApp.class)
public class CodeoflawResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_TITLE = "BBBBBBBBBB";

    @Autowired
    private CodeoflawRepository codeoflawRepository;

    @Autowired
    private CodeoflawService codeoflawService;

    @Autowired
    private CodeoflawSearchRepository codeoflawSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCodeoflawMockMvc;

    private Codeoflaw codeoflaw;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CodeoflawResource codeoflawResource = new CodeoflawResource(codeoflawService);
        this.restCodeoflawMockMvc = MockMvcBuilders.standaloneSetup(codeoflawResource)
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
    public static Codeoflaw createEntity(EntityManager em) {
        Codeoflaw codeoflaw = new Codeoflaw()
            .title(DEFAULT_TITLE)
            .shortTitle(DEFAULT_SHORT_TITLE);
        return codeoflaw;
    }

    @Before
    public void initTest() {
        codeoflawSearchRepository.deleteAll();
        codeoflaw = createEntity(em);
    }

    @Test
    @Transactional
    public void createCodeoflaw() throws Exception {
        int databaseSizeBeforeCreate = codeoflawRepository.findAll().size();

        // Create the Codeoflaw
        restCodeoflawMockMvc.perform(post("/api/codeoflaws")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(codeoflaw)))
            .andExpect(status().isCreated());

        // Validate the Codeoflaw in the database
        List<Codeoflaw> codeoflawList = codeoflawRepository.findAll();
        assertThat(codeoflawList).hasSize(databaseSizeBeforeCreate + 1);
        Codeoflaw testCodeoflaw = codeoflawList.get(codeoflawList.size() - 1);
        assertThat(testCodeoflaw.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCodeoflaw.getShortTitle()).isEqualTo(DEFAULT_SHORT_TITLE);

        // Validate the Codeoflaw in Elasticsearch
        Codeoflaw codeoflawEs = codeoflawSearchRepository.findOne(testCodeoflaw.getId());
        assertThat(codeoflawEs).isEqualToComparingFieldByField(testCodeoflaw);
    }

    @Test
    @Transactional
    public void createCodeoflawWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = codeoflawRepository.findAll().size();

        // Create the Codeoflaw with an existing ID
        codeoflaw.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCodeoflawMockMvc.perform(post("/api/codeoflaws")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(codeoflaw)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Codeoflaw> codeoflawList = codeoflawRepository.findAll();
        assertThat(codeoflawList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = codeoflawRepository.findAll().size();
        // set the field null
        codeoflaw.setTitle(null);

        // Create the Codeoflaw, which fails.

        restCodeoflawMockMvc.perform(post("/api/codeoflaws")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(codeoflaw)))
            .andExpect(status().isBadRequest());

        List<Codeoflaw> codeoflawList = codeoflawRepository.findAll();
        assertThat(codeoflawList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkShortTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = codeoflawRepository.findAll().size();
        // set the field null
        codeoflaw.setShortTitle(null);

        // Create the Codeoflaw, which fails.

        restCodeoflawMockMvc.perform(post("/api/codeoflaws")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(codeoflaw)))
            .andExpect(status().isBadRequest());

        List<Codeoflaw> codeoflawList = codeoflawRepository.findAll();
        assertThat(codeoflawList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCodeoflaws() throws Exception {
        // Initialize the database
        codeoflawRepository.saveAndFlush(codeoflaw);

        // Get all the codeoflawList
        restCodeoflawMockMvc.perform(get("/api/codeoflaws?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(codeoflaw.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].shortTitle").value(hasItem(DEFAULT_SHORT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getCodeoflaw() throws Exception {
        // Initialize the database
        codeoflawRepository.saveAndFlush(codeoflaw);

        // Get the codeoflaw
        restCodeoflawMockMvc.perform(get("/api/codeoflaws/{id}", codeoflaw.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(codeoflaw.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.shortTitle").value(DEFAULT_SHORT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCodeoflaw() throws Exception {
        // Get the codeoflaw
        restCodeoflawMockMvc.perform(get("/api/codeoflaws/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCodeoflaw() throws Exception {
        // Initialize the database
        codeoflawService.save(codeoflaw);

        int databaseSizeBeforeUpdate = codeoflawRepository.findAll().size();

        // Update the codeoflaw
        Codeoflaw updatedCodeoflaw = codeoflawRepository.findOne(codeoflaw.getId());
        updatedCodeoflaw
            .title(UPDATED_TITLE)
            .shortTitle(UPDATED_SHORT_TITLE);

        restCodeoflawMockMvc.perform(put("/api/codeoflaws")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCodeoflaw)))
            .andExpect(status().isOk());

        // Validate the Codeoflaw in the database
        List<Codeoflaw> codeoflawList = codeoflawRepository.findAll();
        assertThat(codeoflawList).hasSize(databaseSizeBeforeUpdate);
        Codeoflaw testCodeoflaw = codeoflawList.get(codeoflawList.size() - 1);
        assertThat(testCodeoflaw.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCodeoflaw.getShortTitle()).isEqualTo(UPDATED_SHORT_TITLE);

        // Validate the Codeoflaw in Elasticsearch
        Codeoflaw codeoflawEs = codeoflawSearchRepository.findOne(testCodeoflaw.getId());
        assertThat(codeoflawEs).isEqualToComparingFieldByField(testCodeoflaw);
    }

    @Test
    @Transactional
    public void updateNonExistingCodeoflaw() throws Exception {
        int databaseSizeBeforeUpdate = codeoflawRepository.findAll().size();

        // Create the Codeoflaw

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCodeoflawMockMvc.perform(put("/api/codeoflaws")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(codeoflaw)))
            .andExpect(status().isCreated());

        // Validate the Codeoflaw in the database
        List<Codeoflaw> codeoflawList = codeoflawRepository.findAll();
        assertThat(codeoflawList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCodeoflaw() throws Exception {
        // Initialize the database
        codeoflawService.save(codeoflaw);

        int databaseSizeBeforeDelete = codeoflawRepository.findAll().size();

        // Get the codeoflaw
        restCodeoflawMockMvc.perform(delete("/api/codeoflaws/{id}", codeoflaw.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean codeoflawExistsInEs = codeoflawSearchRepository.exists(codeoflaw.getId());
        assertThat(codeoflawExistsInEs).isFalse();

        // Validate the database is empty
        List<Codeoflaw> codeoflawList = codeoflawRepository.findAll();
        assertThat(codeoflawList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCodeoflaw() throws Exception {
        // Initialize the database
        codeoflawService.save(codeoflaw);

        // Search the codeoflaw
        restCodeoflawMockMvc.perform(get("/api/_search/codeoflaws?query=id:" + codeoflaw.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(codeoflaw.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].shortTitle").value(hasItem(DEFAULT_SHORT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Codeoflaw.class);
        Codeoflaw codeoflaw1 = new Codeoflaw();
        codeoflaw1.setId(1L);
        Codeoflaw codeoflaw2 = new Codeoflaw();
        codeoflaw2.setId(codeoflaw1.getId());
        assertThat(codeoflaw1).isEqualTo(codeoflaw2);
        codeoflaw2.setId(2L);
        assertThat(codeoflaw1).isNotEqualTo(codeoflaw2);
        codeoflaw1.setId(null);
        assertThat(codeoflaw1).isNotEqualTo(codeoflaw2);
    }
}
