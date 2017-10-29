import {Component, Input, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CodesOfLawService } from '../codesoflaw.service';
import { RouterModule, Routes } from '@angular/router';
var $ = require('jQuery');
import { Article } from '../../entities/article/article.model';
import { ArticleService } from '../../entities/article/article.service';
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {JhiAlertService} from "ng-jhipster";
import {EntityService} from "../../entities/entity.service";
import * as swal from 'sweetalert';
var TreeModel = require('tree-model');
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
    selector: 'treeview',
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
            ])
        ]),

        trigger('myAwesomeAnimation', [
            state('fadeIn', style({
                opacity: '1',
                //transform: 'translateY(100px)'
            })),
            transition('* => *', [style({opacity: '0'}), animate('600ms')])
        ])
    ]
})
export class TreeComponent implements OnInit {

    success: boolean;
    error: string;
    articles: Article[];
    paragraphs;
    currentSearch: string;
    data: any[];
    tree: any;
    root: any;
    nodesGt100 : any;

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
        this.tree = new TreeModel();
        this.root = this.tree.parse({
            id: '0',
            children: [
                {
                    id: 'Buch 1'
                },
                {
                    id: 'Buch 2'
                }
            ]
        });
    }

    getContent(codeOfLaw){
        /*for(let i = 1; i < 6; i++){
            $('#codeoflaw'+i).css({
                'color': 'white',
            });
        }*/
        this.articles = [];
        //codeoflaw, todo: add searchByShortTitle, this one is just an easy workaround
        this.entityService.findArticlesByCodeoflawShortTitle(codeOfLaw.toString()).subscribe((data) => { //this.currentSearch
            let body = JSON.parse(data._body);
            this.articles = body;
            this.updateData();
        }, (error) => this.onError(error));
        return;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    showNotification(type){
        swal("Sorry!", type+" gibt es noch nicht, aber bestimmt im nächsten Release!", "error");
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

    loadAll() {
        if (this.currentSearch) {
            this.searchLike();
            this.updateData();
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

    updateData(){
        for(let currentArticleIndex = 0; currentArticleIndex < this.articles.length; currentArticleIndex++){
            let legalText = this.getLegalTextFromArticle(this.articles[currentArticleIndex]);
            let structureList = this.getStructureListFromArticle(this.articles[currentArticleIndex]);
            let structureItemsUnformatted = structureList.split(",");
            let structureItems = this.filterEmptyEntries(structureItemsUnformatted);
            this.insertElementIntoTreeAtPosition(structureItems, legalText, this.articles[currentArticleIndex].title);
        }
    }

    insertElementIntoTreeAtPosition(structureItems, legalText, paragraph){
        let nodeFound;
        for(let itemIndex = 0; itemIndex < structureItems.length; itemIndex++){
            nodeFound = this.searchTreeCompareWithItemList(structureItems, itemIndex);
            if(!nodeFound){
                this.createPathAndInsertNewElement(structureItems, itemIndex, legalText);
                itemIndex = structureItems.length;
                break;
            }
        }
        if(nodeFound){
            let newNode = this.tree.parse({id: paragraph, children: [{id: legalText}]});
            //let newNode = this.tree.parse({id: legalText});
            nodeFound.addChild(newNode)
        }
    }

    createPathAndInsertNewElement(structureItems, itemIndex, legalText){
        let elementIsRoot = (itemIndex == 0);
        if(elementIsRoot){
            this.insertNewElement(structureItems, legalText, null, null);
        } else{
            let nodeBefore = this.searchTreeCompareWithItemList(structureItems, itemIndex-1);
            this.insertNewElement(structureItems, legalText, nodeBefore, itemIndex);
        }
    }

    searchTreeCompareWithItemList(structureItems, itemIndex){
        let currentItem = structureItems[itemIndex];
        let nodeFound = this.root.first(function (node) {
            return node.model.id === currentItem;
        });
        if(!nodeFound){
            return nodeFound;
        }
        let equalPaths = this.checkNodePath(nodeFound,structureItems,currentItem);
        if(equalPaths == true){
            return nodeFound
        } else{
            return null;
        }
    }

    checkNodePath(node, structureItems, currentItem){
        let result;
        if(node.getPath().length > 1){
            let pathEqual = true;
            for(let i = 0; i < node.getPath().length -1; i++){
                if(node.getPath()[i+1].model.id != structureItems[i]){
                    pathEqual = false;
                    i = node.getPath().length;
                    result = null;
                }
            }
            if(pathEqual = true){
                result = node.model.id === currentItem;
            } else{
                result = null;
            }
        } else{
            result = node.model.id === currentItem;
        }
        return result;
    }

    insertNewElement(structureItems, legaltext, nodeBefore, itemIndex){
        let treeNode;
        let elementIsRoot = (nodeBefore == null);
        if(elementIsRoot){
            let newNode = this.tree.parse({id : structureItems[0], children: []});
            this.pushChildren(newNode, legaltext, structureItems, 1, structureItems.length);
            this.root.addChild(newNode);
        } else{
            //let newNode = JSON.parse(JSON.stringify(nodeBefore));
            this.pushChildren(nodeBefore, legaltext, structureItems, itemIndex, structureItems.length);
            //nodeBefore.addChild(newNode);
        }
    }

    pushChildren(node, legalText, structureItems, itemIndex, numberOfItems){
        if(itemIndex < numberOfItems){
            let createdNode = this.tree.parse({id : structureItems[itemIndex], children:[]});
            node.addChild(createdNode);
            itemIndex = itemIndex + 1;
            this.pushChildren(node.children[node.children.length-1], legalText, structureItems, itemIndex, numberOfItems);
        } else{
            node.id = legalText;
            return;
        }
    }

    getLegalTextFromArticle(article){
        return article.legaltext.substring(article.legaltext.indexOf("]")+2, article.legaltext.length);
    }

    getStructureListFromArticle(article){
        return article.legaltext.substring(article.legaltext.indexOf("[")+1, article.legaltext.indexOf("]"));
    }

    filterEmptyEntries(structureItems){
        let filteredItems = [];
        let currentItem;
        for(let j = 0; j < structureItems.length; j++){
            if(structureItems[j].length > 1){
                currentItem = structureItems[j].replace(/^( *)[ ]/g, '');
                filteredItems.push(currentItem);
            }
        }
        return filteredItems;
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

    searchLike(){
        this.entityService.findArticlesByKeyword('%'+this.currentSearch+'%').subscribe((data) => { //this.currentSearch
            let body = JSON.parse(data._body);
            this.articles = body;

            console.log(body);
        }, (error) => this.onError(error));
    }
}
