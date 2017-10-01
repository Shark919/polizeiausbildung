import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Codeoflaw } from './codeoflaw.model';
import { CodeoflawService } from './codeoflaw.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-codeoflaw',
    templateUrl: './codeoflaw.component.html'
})
export class CodeoflawComponent implements OnInit, OnDestroy {
codeoflaws: Codeoflaw[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private codeoflawService: CodeoflawService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.codeoflawService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.codeoflaws = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.codeoflawService.query().subscribe(
            (res: ResponseWrapper) => {
                this.codeoflaws = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCodeoflaws();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Codeoflaw) {
        return item.id;
    }
    registerChangeInCodeoflaws() {
        this.eventSubscriber = this.eventManager.subscribe('codeoflawListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
