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
import {FeedbackService} from "./feedback/feedback.service";
import {FeedbackModalComponent} from "./feedback/feedback.component";
import {FeedbackModalService} from "./feedback/feedback-modal.service";

@NgModule({
    imports: [
        PolizeiausbildungSharedLibsModule,
        PolizeiausbildungSharedCommonModule
    ],
    declarations: [
        JhiSocialComponent,
        TinyEditorComponent,
        SearchComponent,
        FeedbackModalComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        FeedbackService,
        FeedbackModalService,
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
    entryComponents: [JhiLoginModalComponent, FeedbackModalComponent],
    exports: [
        PolizeiausbildungSharedCommonModule,
        JhiSocialComponent,
        TinyEditorComponent,
        SearchComponent,
        JhiLoginModalComponent,
        FeedbackModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PolizeiausbildungSharedModule {}
