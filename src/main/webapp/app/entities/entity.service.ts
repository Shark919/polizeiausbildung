import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EntityService {

    private queryCompleteUrl = 'api/flashcardQuery';

    constructor(private http: Http) {}

    addFlashcard(flashcardTitle: string, flashcardDescription: string): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('flashcardTitle', flashcardTitle);
        params.set('flashcardDescription', flashcardDescription);
        let body = "{\"flashcardTitle\":\""+flashcardTitle+"\",\"flashcardDescription\":\""+flashcardDescription+"\"}";
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({
            headers: headers
        });
        return this.http.post('api/flashcardCreate', body,options).map((res: Response) => res);
    }
    searchFlashcardByTitle(flashcardTitle: string): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('flashcardTitle', flashcardTitle);

        return this.http.get('api/flashcard', {
            search: params
        }).map((res: Response) => res);
    }

    searchFlashcardByTitleLike(flashcardTitle: string): Observable<any> {
        console.log("searchFlashcardByTitleLike: "+flashcardTitle);
        const params: URLSearchParams = new URLSearchParams();
        params.set('flashcardTitle', flashcardTitle);

        return this.http.get('api/flashcardLike', {
            search: params
        }).map((res: Response) => res);
    }

    queryComplete(query: string): Observable<any> {
        console.log("query: "+query);
        const params: URLSearchParams = new URLSearchParams();
        params.set('flashcardQuery', query);

        return this.http.get(this.queryCompleteUrl, {
            search: params
        }).map((res: Response) => res);
    }

    findFlashcardsByDescriptionContains(flashcardDescription: string): Observable<any> {
        console.log("findFlashcardsByDescriptionContains: "+flashcardDescription);
        const params: URLSearchParams = new URLSearchParams();
        params.set('flashcardDescription', flashcardDescription);

        return this.http.get('api/flashcardDescription', {
            search: params
        }).map((res: Response) => res);
    }

    findArticlesByCodeoflawShortTitle(shorttitle: string): Observable<any> {
        console.log("findArticlesByCodeoflawShortTitle: "+shorttitle);
        const params: URLSearchParams = new URLSearchParams();
        params.set('shorttitle', shorttitle);

        return this.http.get('api/articlesLike', { //articlesLike
            search: params
        }).map((res: Response) => res);
    }

    findArticlesByKeyword(keyword: string): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('keyword', keyword);

        return this.http.get('api/articlesKeyword', { //articlesLike
            search: params
        }).map((res: Response) => res);
    }

}
