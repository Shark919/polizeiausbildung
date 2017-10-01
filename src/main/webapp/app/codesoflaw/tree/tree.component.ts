import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CodesOfLawService } from '../codesoflaw.service';
import { RouterModule, Routes } from '@angular/router';
var $ = require('jQuery');

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
    paragraphs;

    constructor(
        private CodesOfLawService: CodesOfLawService
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.paragraphs = [];
    }

    getContent(codeOfLaw){
        console.log("GET CONTENT WITH "+codeOfLaw);
        this.lawcontent = "Inhalte zum Gesetzbuch "+codeOfLaw;
        for(let i = 1; i < 6; i++){
            $('#codeoflaw'+i).css({
                'color': 'white',
            });
        }
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
