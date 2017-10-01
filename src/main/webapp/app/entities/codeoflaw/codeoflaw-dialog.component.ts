import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Codeoflaw } from './codeoflaw.model';
import { CodeoflawPopupService } from './codeoflaw-popup.service';
import { CodeoflawService } from './codeoflaw.service';

@Component({
    selector: 'jhi-codeoflaw-dialog',
    templateUrl: './codeoflaw-dialog.component.html'
})
export class CodeoflawDialogComponent implements OnInit {

    codeoflaw: Codeoflaw;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private codeoflawService: CodeoflawService,
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
        if (this.codeoflaw.id !== undefined) {
            this.subscribeToSaveResponse(
                this.codeoflawService.update(this.codeoflaw));
        } else {
            this.subscribeToSaveResponse(
                this.codeoflawService.create(this.codeoflaw));
        }
    }

    private subscribeToSaveResponse(result: Observable<Codeoflaw>) {
        result.subscribe((res: Codeoflaw) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Codeoflaw) {
        this.eventManager.broadcast({ name: 'codeoflawListModification', content: 'OK'});
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
    selector: 'jhi-codeoflaw-popup',
    template: ''
})
export class CodeoflawPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private codeoflawPopupService: CodeoflawPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.codeoflawPopupService
                    .open(CodeoflawDialogComponent as Component, params['id']);
            } else {
                this.codeoflawPopupService
                    .open(CodeoflawDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
