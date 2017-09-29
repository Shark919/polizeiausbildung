import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CodesOfLawService } from '../codesoflaw.service';
import { RouterModule, Routes } from '@angular/router';
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
    title: string;
    description: string;
    flashcards;

    constructor(
        private entityService: CodesOfLawService
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.title = "";
        this.description = "";
        this.flashcards = [];
    }

}
