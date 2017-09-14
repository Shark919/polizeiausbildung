import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PolizeiausbildungSharedModule } from '../shared';
import { PolizeiausbildungFlashcardModule } from './flashcard/flashcard.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

//,
import {
    accountState
} from './';

import {SearchComponent} from "./search/search.component";

@NgModule({
    imports: [
        PolizeiausbildungFlashcardModule,
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
