import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CodesOfLawService } from '../codesoflaw.service';
import { RouterModule, Routes } from '@angular/router';
var $ = require('jQuery');
import { Article } from '../../entities/article/article.model';
import { ArticleService } from '../../entities/article/article.service';
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {JhiAlertService} from "ng-jhipster";

@Component({
    selector: 'tree',
    templateUrl: './tree.component.html',
    providers: [
        CodesOfLawService
    ]
})
export class TreeComponent implements OnInit {

    success: boolean;
    error: string;
    lawcontent: string;
    articles: Article[];
    paragraphs;

    constructor(
        private CodesOfLawService: CodesOfLawService,
        private alertService: JhiAlertService,
        private articleService: ArticleService
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.paragraphs = [];
    }

    getContent(codeOfLaw){
        this.lawcontent = "Inhalte zum Gesetzbuch "+codeOfLaw;
        for(let i = 1; i < 6; i++){
            $('#codeoflaw'+i).css({
                'color': 'white',
            });
        }
        this.articleService.search({
            query: codeOfLaw.toString(), //codeoflaw, todo: add searchByShortTitle, this one is just an easy workaround
        }).subscribe(
            (res: ResponseWrapper) => this.articles = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
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
