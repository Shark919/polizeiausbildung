import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TreeComponent } from './tree.component';

export const treeRoute: Route = {
    path: 'tree',
    component: TreeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Tree'
    },
    canActivate: [UserRouteAccessService]
};
