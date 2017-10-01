import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Flashcard } from './flashcard.model';
import { FlashcardService } from './flashcard.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import {EntityService} from '../entity.service';

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

@Component({
    selector: 'jhi-flashcard',
    templateUrl: './flashcard.component.html',
    providers: [
        EntityService
    ]
})

export class FlashcardComponent implements OnInit, OnDestroy {
flashcards: Flashcard[];
flashcardsNoHTML : Flashcard[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private flashcardService: FlashcardService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private entityService: EntityService
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        this.searchFlashcardByTitleLike("");
       /* if (this.crrentSearch) {
            this.flashcardService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.flashcards = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.flashcardService.query().subscribe(
            (res: ResponseWrapper) => {
                this.flashcards = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );*/
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    searchFlashcardByTitleLike(searchKeyword) {
        this.entityService.searchFlashcardByTitleLike(searchKeyword+"%").subscribe((data) => {
            let body = JSON.parse(data._body);
            this.flashcards = body;
            this.flashcardsNoHTML = body;

            for(let i = 0; i < this.flashcardsNoHTML.length; i++) {
                let descriptionWithHTML = this.flashcardsNoHTML[i].description;
                let regex = /<[^>]*>/;
                let descriptionNoHTML = replaceAll(descriptionWithHTML, regex, "");
                this.flashcardsNoHTML[i].description = descriptionNoHTML;
            }
            console.log(body);
        }, (error) => this.onError(error));
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
        this.registerChangeInFlashcards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Flashcard) {
        return item.id;
    }
    registerChangeInFlashcards() {
        this.eventSubscriber = this.eventManager.subscribe('flashcardListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
