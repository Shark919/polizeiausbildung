import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Flashcard } from './flashcard.model';
import { FlashcardService } from './flashcard.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import {EntityService} from '../entity.service';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes,
    query,
    stagger
} from '@angular/animations';

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

@Component({
    selector: 'jhi-flashcard',
    templateUrl: './flashcard.component.html',
    providers: [
        EntityService
    ],
    animations: [

        trigger('listAnimation', [
            transition('* => *', [

                query(':enter', style({ opacity: 0 }), {optional: true}),

                query(':enter', stagger('150ms', [
                    animate('350ms ease-in', keyframes([
                        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                        style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
                    ]))]), {optional: true}),

                //query(':leave', style({ opacity: 1 }), {optional: true}),

                //query(':leave', stagger('1ms', [
                //    animate('100ms ease-in', keyframes([
                //        style({opacity: 0, transform: 'translateX(-50%)'}),
                //   ]))]), {optional: true})
            ])
        ]),

        trigger('myAwesomeAnimation', [
            state('fadeIn', style({
                opacity: '1',
                //transform: 'translateY(100px)'
            })),
            transition('void => *', [style({opacity: '0'}), animate('600ms')])
        ])
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
        this.searchFlashcardByTitleLike("zzzzzzzzz");
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
