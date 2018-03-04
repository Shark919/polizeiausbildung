import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, FeedbackModalService, Principal } from '../shared';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger,
    keyframes
} from '@angular/animations';
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ],
    animations: [
        trigger('myAwesomeAnimation', [
            state('fadeIn', style({
                opacity: '1',
                transform: 'translateY(100px)'
            })),
            transition('void => *', [style({ opacity: '0' }), animate('1000ms')])
        ])
    ]
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private feedbackModalService: FeedbackModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        console.log('yo');
        this.modalRef = this.loginModalService.open();
    }

    feedback() {
        this.modalRef = this.feedbackModalService.open();
    }
}
