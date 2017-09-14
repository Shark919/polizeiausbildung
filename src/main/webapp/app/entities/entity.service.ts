import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EntityService {

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
        const params: URLSearchParams = new URLSearchParams();
        params.set('flashcardTitle', flashcardTitle);

        return this.http.get('api/flashcardLike', {
            search: params
        }).map((res: Response) => res);
    }

}
