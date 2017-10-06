import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EntityService } from '../../entities/entity.service';
import { RouterModule, Routes } from '@angular/router';

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
    selector: 'search',
    templateUrl: './search.component.html',
    providers: [
        EntityService
    ],
    animations: [

        trigger('listAnimation', [
            transition('* => *', [

                query(':enter', style({ opacity: 0 }), {optional: true}),

                query(':enter', stagger('150ms', [
                    animate('500ms ease-in', keyframes([
                        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                        style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
                    ]))]), {optional: true})
            ])
        ])

    ]
})
export class SearchComponent implements OnInit {

    success: boolean;
    error: string;
    title: string;
    description: string;
    currentSearch: string;
    flashcards;
    flashcardsNoHTML;

    constructor(
        private entityService: EntityService
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.title = ""
        this.description = "";
        this.flashcards = [];
        this.flashcardsNoHTML = [];
        this.searchFlashcardByTitleLike("");
    }

    searchFlashcardByTitle(searchKeyword){
        this.entityService.searchFlashcardByTitle(searchKeyword).subscribe((data) =>{
            let body = JSON.parse(data._body);
            console.log(body);
            this.title = body.title;
            this.description = body.description;
            this.success = true;
        }, (error) => this.processError(error));
    }

    searchFlashcardByTitleLike(searchKeyword){
        this.entityService.searchFlashcardByTitleLike("%"+searchKeyword+"%").subscribe((data) =>{
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
            this.title = body.title;
            this.description = body.description;
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

    clear() {
        this.currentSearch = '';
        this.searchFlashcardByTitleLike("");
    }

}
