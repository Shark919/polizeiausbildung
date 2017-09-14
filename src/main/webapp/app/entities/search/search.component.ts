import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EntityService } from '../entity.service';
import { RouterModule, Routes } from '@angular/router';
@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    providers: [
        EntityService
    ]
})
export class SearchComponent implements OnInit {

    success: boolean;
    error: string;
    title: string;
    description: string;
    currentSearch: string;
    flashcards;

    constructor(
        private entityService: EntityService
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.title = ""
        this.description = "";
        this.flashcards = [];
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
        this.entityService.searchFlashcardByTitleLike(searchKeyword+"%").subscribe((data) =>{
            let body = JSON.parse(data._body);
            this.flashcards = body;
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
