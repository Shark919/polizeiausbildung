import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SearchComponent } from './search.component';

export const searchRoute: Route = {
    path: 'search',
    component: SearchComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Polizeiakademie'
    },
    canActivate: [UserRouteAccessService]
};
