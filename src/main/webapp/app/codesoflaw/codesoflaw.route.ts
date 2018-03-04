import { Routes } from '@angular/router';

import { treeRoute } from "./tree/tree.route";
import { TreeComponent } from "./tree/tree.component";

const ACCOUNT_ROUTES = [
    treeRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
