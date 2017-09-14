import { Routes } from '@angular/router';

import {searchRoute} from "./search/search.route";

const ACCOUNT_ROUTES = [
    searchRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
},
    {path: 'search',
        redirectTo: './search',
        pathMatch: 'full'}];
