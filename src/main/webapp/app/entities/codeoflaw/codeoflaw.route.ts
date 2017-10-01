import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CodeoflawComponent } from './codeoflaw.component';
import { CodeoflawDetailComponent } from './codeoflaw-detail.component';
import { CodeoflawPopupComponent } from './codeoflaw-dialog.component';
import { CodeoflawDeletePopupComponent } from './codeoflaw-delete-dialog.component';

export const codeoflawRoute: Routes = [
    {
        path: 'codeoflaw',
        component: CodeoflawComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Codeoflaws'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'codeoflaw/:id',
        component: CodeoflawDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Codeoflaws'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const codeoflawPopupRoute: Routes = [
    {
        path: 'codeoflaw-new',
        component: CodeoflawPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Codeoflaws'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'codeoflaw/:id/edit',
        component: CodeoflawPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Codeoflaws'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'codeoflaw/:id/delete',
        component: CodeoflawDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Codeoflaws'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
