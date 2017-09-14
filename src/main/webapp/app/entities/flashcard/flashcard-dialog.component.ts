import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Flashcard } from './flashcard.model';
import { FlashcardPopupService } from './flashcard-popup.service';
import { FlashcardService } from './flashcard.service';

@Component({
    selector: 'jhi-flashcard-dialog',
    templateUrl: './flashcard-dialog.component.html'
})
export class FlashcardDialogComponent implements OnInit {

    flashcard: Flashcard;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private flashcardService: FlashcardService,
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
        if (this.flashcard.id !== undefined) {
            this.subscribeToSaveResponse(
                this.flashcardService.update(this.flashcard));
        } else {
            this.subscribeToSaveResponse(
                this.flashcardService.create(this.flashcard));
        }
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
