import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Codeoflaw } from './codeoflaw.model';
import { CodeoflawPopupService } from './codeoflaw-popup.service';
import { CodeoflawService } from './codeoflaw.service';

@Component({
    selector: 'jhi-codeoflaw-delete-dialog',
    templateUrl: './codeoflaw-delete-dialog.component.html'
})
export class CodeoflawDeleteDialogComponent {

    codeoflaw: Codeoflaw;

    constructor(
        private codeoflawService: CodeoflawService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.codeoflawService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'codeoflawListModification',
                content: 'Deleted an codeoflaw'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-codeoflaw-delete-popup',
    template: ''
})
export class CodeoflawDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private codeoflawPopupService: CodeoflawPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.codeoflawPopupService
                .open(CodeoflawDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
