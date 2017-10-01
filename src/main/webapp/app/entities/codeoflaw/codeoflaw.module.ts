import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PolizeiausbildungSharedModule } from '../../shared';
import {
    CodeoflawService,
    CodeoflawPopupService,
    CodeoflawComponent,
    CodeoflawDetailComponent,
    CodeoflawDialogComponent,
    CodeoflawPopupComponent,
    CodeoflawDeletePopupComponent,
    CodeoflawDeleteDialogComponent,
    codeoflawRoute,
    codeoflawPopupRoute,
} from './';

const ENTITY_STATES = [
    ...codeoflawRoute,
    ...codeoflawPopupRoute,
];

@NgModule({
    imports: [
        PolizeiausbildungSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CodeoflawComponent,
        CodeoflawDetailComponent,
        CodeoflawDialogComponent,
        CodeoflawDeleteDialogComponent,
        CodeoflawPopupComponent,
        CodeoflawDeletePopupComponent,
    ],
    entryComponents: [
        CodeoflawComponent,
        CodeoflawDialogComponent,
        CodeoflawPopupComponent,
        CodeoflawDeleteDialogComponent,
        CodeoflawDeletePopupComponent,
    ],
    providers: [
        CodeoflawService,
        CodeoflawPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PolizeiausbildungCodeoflawModule {}
