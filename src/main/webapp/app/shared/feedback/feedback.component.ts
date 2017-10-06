import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { FeedbackService } from './feedback.service';
import { StateStorageService } from '../auth/state-storage.service';
import { SocialService } from '../social/social.service';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './feedback.component.html'
})
export class FeedbackModalComponent implements AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    constructor(
        private eventManager: JhiEventManager,
        private feedbackService: FeedbackService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private socialService: SocialService,
        private router: Router,
        public activeModal: NgbActiveModal
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

}
