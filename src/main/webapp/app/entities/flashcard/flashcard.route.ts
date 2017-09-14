import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FlashcardComponent } from './flashcard.component';
import { FlashcardDetailComponent } from './flashcard-detail.component';
import { FlashcardPopupComponent } from './flashcard-dialog.component';
import { FlashcardDeletePopupComponent } from './flashcard-delete-dialog.component';

export const flashcardRoute: Routes = [
    {
        path: 'flashcard',
        component: FlashcardComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flashcards'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'flashcard/:id',
        component: FlashcardDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flashcards'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flashcardPopupRoute: Routes = [
    {
        path: 'flashcard-new',
        component: FlashcardPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flashcards'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flashcard/:id/edit',
        component: FlashcardPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flashcards'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flashcard/:id/delete',
        component: FlashcardDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flashcards'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
