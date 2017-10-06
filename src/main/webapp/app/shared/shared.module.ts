import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    PolizeiausbildungSharedLibsModule,
    PolizeiausbildungSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    TinyEditorComponent,
    SocialService,
    JhiLoginModalComponent
} from './';
import {SearchComponent} from "./search/search.component";

@NgModule({
    imports: [
        PolizeiausbildungSharedLibsModule,
        PolizeiausbildungSharedCommonModule
    ],
    declarations: [
        JhiSocialComponent,
        TinyEditorComponent,
        SearchComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        PolizeiausbildungSharedCommonModule,
        JhiSocialComponent,
        TinyEditorComponent,
        SearchComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PolizeiausbildungSharedModule {}
