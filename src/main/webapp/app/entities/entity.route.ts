import { Routes } from '@angular/router';

import {searchRoute} from "./search/search.route";
import {articleRoute} from "./article/article.route";
import {codeoflawRoute} from "./codeoflaw/codeoflaw.route";


const ACCOUNT_ROUTES = [
    searchRoute
];

export const accountState: Routes = [
    {
        path: '',
        children: ACCOUNT_ROUTES
    },
    {
        path: 'search',
        redirectTo: './search',
        pathMatch: 'full'
    },
    {
        path: 'article',
        children: articleRoute
    },
    {
        path: 'codeoflaw',
        children: codeoflawRoute
    }
];
