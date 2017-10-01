import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Codeoflaw } from './codeoflaw.model';
import { CodeoflawService } from './codeoflaw.service';

@Component({
    selector: 'jhi-codeoflaw-detail',
    templateUrl: './codeoflaw-detail.component.html'
})
export class CodeoflawDetailComponent implements OnInit, OnDestroy {

    codeoflaw: Codeoflaw;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private codeoflawService: CodeoflawService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCodeoflaws();
    }

    load(id) {
        this.codeoflawService.find(id).subscribe((codeoflaw) => {
            this.codeoflaw = codeoflaw;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCodeoflaws() {
        this.eventSubscriber = this.eventManager.subscribe(
            'codeoflawListModification',
            (response) => this.load(this.codeoflaw.id)
        );
    }
}
