import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PolizeiausbildungSharedModule } from '../shared';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

//,
import {
    accountState
} from './';

import { TreeComponent } from "./tree/tree.component";
import { NodeComponent } from "./tree/node.component";
import { HierarchyComponent } from "./tree/hierarchy.component";

@NgModule({
    imports: [
        PolizeiausbildungSharedModule,
        RouterModule.forRoot(accountState, { useHash: true })
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [TreeComponent, NodeComponent, HierarchyComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PolizeiausbildungCodesoflawModule { }
