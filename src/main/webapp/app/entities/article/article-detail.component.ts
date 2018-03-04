import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Article } from './article.model';
import { ArticleService } from './article.service';
import { EntityService } from "../entity.service";

@Component({
    selector: 'jhi-article-detail',
    templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

    article: Article;
    articleContent: string[];
    contentWords: string[];
    contentWithLinks: any[];
    currentId: string;
    currentTitle: string;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private articleService: ArticleService,
        private alertService: JhiAlertService,
        private entityService: EntityService,
        private route: ActivatedRoute
    ) {
        this.contentWithLinks = [];
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInArticles();
    }

    load(id) {
        this.articleService.find(id).subscribe((article) => {
            this.article = article;
            this.initContent();
        });
    }
    initContent() {
        let legalText = this.article.legaltext;
        legalText = legalText.replace(/<\/P>/g, "");
        legalText = legalText.replace(/<P>/g, "<P> ");
        this.contentWords = legalText.split(" ");
        this.getFlashcardLinks();
        let splitTextByHTML = legalText.split("<P>");
        this.articleContent = splitTextByHTML;
        console.log(splitTextByHTML);
    }
    getFlashcardLinks() {
        //todo: replace <P>
        for (let i = 0; i < this.contentWords.length; i++) {
            this.entityService.searchFlashcardByTitleLike('%' + this.contentWords[i] + '%').subscribe((data) => { //this.currentSearch
                let body = JSON.parse(data._body);
                if (body.length > 0) {
                    console.log("BODY_ " + body);
                    for (let j = 0; j < this.contentWords.length; j++) {
                        if (this.contentWords[j] == body[0].title) {
                            this.contentWithLinks.push([body[0].title, body[0].id]);
                        }
                    }
                }
            }, (error) => this.onError(error));
        }
    }

    hasLink(legalTextWord) {
        //console.log("legaltextWord: "+legalTextWord);
        if (this.contentWithLinks.length < 1) {
            return false;
        }
        for (let i = 0; i < this.contentWithLinks.length; i++) {
            if (this.contentWithLinks[i][0] == legalTextWord) {
                this.currentId = this.contentWithLinks[i][1];
                this.currentTitle = this.contentWithLinks[i][0];
                return true;
            }
        }
        return false;
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInArticles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'articleListModification',
            (response) => this.load(this.article.id)
        );
    }
    private onError(error) {
        //this.alertService.error(error.message, null, null);
    }
}
