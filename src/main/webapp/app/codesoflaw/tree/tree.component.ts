import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CodesOfLawService } from '../codesoflaw.service';
import { RouterModule, Routes } from '@angular/router';
var $ = require('jQuery');
import { Article } from '../../entities/article/article.model';
import { ArticleService } from '../../entities/article/article.service';
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {JhiAlertService} from "ng-jhipster";
import {EntityService} from "../../entities/entity.service";

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

@Component({
    selector: 'tree',
    templateUrl: './tree.component.html',
    providers: [
        CodesOfLawService,
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
export class TreeComponent implements OnInit {

    success: boolean;
    error: string;
    articles: Article[];
    paragraphs;

    constructor(
        private CodesOfLawService: CodesOfLawService,
        private alertService: JhiAlertService,
        private articleService: ArticleService,
        private entityService: EntityService
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.paragraphs = [];
    }

    getContent(codeOfLaw){
        console.log("get content method with code of law: "+codeOfLaw);
        for(let i = 1; i < 6; i++){
            $('#codeoflaw'+i).css({
                'color': 'white',
            });
        }
        this.articles = [];
        //codeoflaw, todo: add searchByShortTitle, this one is just an easy workaround
        this.entityService.findArticlesByCodeoflawShortTitle(codeOfLaw.toString()).subscribe((data) => { //this.currentSearch
            let body = JSON.parse(data._body);
            this.articles = body;

            console.log(body);
        }, (error) => this.onError(error));
        return;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    getCodeOfLawContentByKeyword(searchKeyword){
        this.CodesOfLawService.getCodeOfLawContentByKeyword(searchKeyword).subscribe((data) =>{
            let body = JSON.parse(data._body);
            this.paragraphs = body;
            console.log(body);
            this.success = true;
        }, (error) => this.processError(error));
    }

    private processError(response) {
        this.success = null;
        if (response.status === 400 && response._body === '...') {
            //this.errorUserExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
