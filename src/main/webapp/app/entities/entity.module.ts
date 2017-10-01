import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PolizeiausbildungSharedModule } from '../shared';
import { PolizeiausbildungFlashcardModule } from './flashcard/flashcard.module';
import { PolizeiausbildungCodeoflawModule } from './codeoflaw/codeoflaw.module';
import { PolizeiausbildungArticleModule } from './article/article.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

//,
import {
    accountState
} from './';

import {SearchComponent} from "./search/search.component";
import {CodeoflawComponent} from "./codeoflaw/codeoflaw.component";
import {ArticleComponent} from "./article/article.component";

@NgModule({
    imports: [
        PolizeiausbildungFlashcardModule,
        PolizeiausbildungCodeoflawModule,
        PolizeiausbildungArticleModule,
        PolizeiausbildungSharedModule,
        RouterModule.forRoot(accountState, { useHash: true })
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [SearchComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PolizeiausbildungEntityModule {}
