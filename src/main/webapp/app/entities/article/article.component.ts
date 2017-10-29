import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Article } from './article.model';
import { ArticleService } from './article.service';
import { EntityService} from "../entity.service";
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-article',
    templateUrl: './article.component.html',
    providers: [
        EntityService
    ]
})
export class ArticleComponent implements OnInit, OnDestroy {
articles: Article[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private articleService: ArticleService,
        private entityService: EntityService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.searchLike();
            return;
       }
        this.articleService.query().subscribe(
            (res: ResponseWrapper) => {
                this.articles = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    searchLike(){
        this.entityService.findArticlesByKeyword('%'+this.currentSearch+'%').subscribe((data) => { //this.currentSearch
            let body = JSON.parse(data._body);
            this.articles = body;

            console.log(body);
        }, (error) => this.onError(error));
    }

    searchLikeCOL(){
        this.entityService.findArticlesByCodeoflawShortTitle(this.currentSearch).subscribe((data) => { //this.currentSearch
            let body = JSON.parse(data._body);
            this.articles = body;

            console.log(body);
        }, (error) => this.onError(error));
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
        this.registerChangeInArticles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Article) {
        return item.id;
    }
    registerChangeInArticles() {
        this.eventSubscriber = this.eventManager.subscribe('articleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
