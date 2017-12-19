import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Flashcard } from './flashcard.model';
import { FlashcardPopupService } from './flashcard-popup.service';
import { FlashcardService } from './flashcard.service';
import {forEach} from "@angular/router/src/utils/collection";
import {EntityService} from "../entity.service";

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

@Component({
    selector: 'jhi-flashcard-dialog',
    templateUrl: './flashcard-dialog.component.html'
})
export class FlashcardDialogComponent implements OnInit {

    flashcard: Flashcard;
    isSaving: boolean;
    obs: any;
    finalobs: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private flashcardService: FlashcardService,
        private entityService: EntityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.createHyperlinks();
    }
    private saveAndUpdate() {
        if (this.flashcard.id !== undefined) {
            this.subscribeToSaveResponse(
                this.flashcardService.update(this.flashcard));
        } else {
            this.subscribeToSaveResponse(
                this.flashcardService.create(this.flashcard));
        }
    }

    private createHyperlinks() {
       let plannedLinks = this.getPlannedLinks();
       if (plannedLinks != null){
           for (let i = 0; i < plannedLinks.length; i++) {
               this.obs = new Observable(observer => {
                   this.getURLForItem(observer, plannedLinks[i]);
               });
               let url;
               let subscription = this.obs.subscribe(
                   value => {
                       url = value;
                       this.flashcard.description = replaceAll(this.flashcard.description, plannedLinks[i], url);
                       this.saveAndUpdate();
                   }
               );
           }
       } else {
           this.saveAndUpdate();
       }
    }

    private getPlannedLinks() {
        let plannedLinks;
        let flashcardText = this.flashcard.description
        let regex = /\[\[.+\]\]/;
        let regexGetDoubleBrackets = new RegExp('/\[\[[\w\W]+\]\]');
        plannedLinks = flashcardText.match(regex);
        return plannedLinks;
    }

    private getURLForItem(observer, query) {
        query = replaceAll(query, "[[", "");
        query = replaceAll(query, "]]", "");
        let flashcardId = 0;
        this.entityService.queryComplete(query).subscribe((data) =>{
            let body = data.json();
            // todo: if multiple entries show new page
            // todo: search in title AND description
            try {
                flashcardId = body[0].id;
                observer.next('<a href=' + window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/#/flashcard/' + flashcardId + '>'+query+'</a>');
            } catch(error) {}
        }, (error) => this.onSaveError(error));
    }

    private subscribeToSaveResponse(result: Observable<Flashcard>) {
        result.subscribe((res: Flashcard) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Flashcard) {
        this.eventManager.broadcast({ name: 'flashcardListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    keyupHandler(event){
        //console.log(event.toString());
        this.flashcard.description = event.toString();
    }
}

@Component({
    selector: 'jhi-flashcard-popup',
    template: ''
})
export class FlashcardPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flashcardPopupService: FlashcardPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.flashcardPopupService
                    .open(FlashcardDialogComponent as Component, params['id']);
            } else {
                this.flashcardPopupService
                    .open(FlashcardDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
