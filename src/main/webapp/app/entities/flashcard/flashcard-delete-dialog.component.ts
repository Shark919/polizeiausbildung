import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Flashcard } from './flashcard.model';
import { FlashcardPopupService } from './flashcard-popup.service';
import { FlashcardService } from './flashcard.service';

@Component({
    selector: 'jhi-flashcard-delete-dialog',
    templateUrl: './flashcard-delete-dialog.component.html'
})
export class FlashcardDeleteDialogComponent {

    flashcard: Flashcard;

    constructor(
        private flashcardService: FlashcardService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flashcardService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'flashcardListModification',
                content: 'Deleted an flashcard'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flashcard-delete-popup',
    template: ''
})
export class FlashcardDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flashcardPopupService: FlashcardPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.flashcardPopupService
                .open(FlashcardDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
