import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PolizeiausbildungSharedModule } from '../../shared';
import {
    FlashcardService,
    FlashcardPopupService,
    FlashcardComponent,
    FlashcardDetailComponent,
    FlashcardDialogComponent,
    FlashcardPopupComponent,
    FlashcardDeletePopupComponent,
    FlashcardDeleteDialogComponent,
    flashcardRoute,
    flashcardPopupRoute,
} from './';

const ENTITY_STATES = [
    ...flashcardRoute,
    ...flashcardPopupRoute,
];

@NgModule({
    imports: [
        PolizeiausbildungSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FlashcardComponent,
        FlashcardDetailComponent,
        FlashcardDialogComponent,
        FlashcardDeleteDialogComponent,
        FlashcardPopupComponent,
        FlashcardDeletePopupComponent,
    ],
    entryComponents: [
        FlashcardComponent,
        FlashcardDialogComponent,
        FlashcardPopupComponent,
        FlashcardDeleteDialogComponent,
        FlashcardDeletePopupComponent,
    ],
    providers: [
        FlashcardService,
        FlashcardPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PolizeiausbildungFlashcardModule { }
