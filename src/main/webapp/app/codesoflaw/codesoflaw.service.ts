import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CodesOfLawService {
    constructor(private http: Http) {}

    getCodeOfLawContentByKeyword(codeOfLawTitle: string): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('codeOfLawTitle', codeOfLawTitle);

        return this.http.get('api/codeoflaws/articleSearch', {
            search: params
        }).map((res: Response) => res);
    }

}
