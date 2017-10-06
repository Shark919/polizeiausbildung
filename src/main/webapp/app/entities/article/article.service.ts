import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Article } from './article.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ArticleService {

    private ressourceSearchLikeUrl = 'api/articles/like';
    private resourceUrl = 'api/articles';
    private resourceSearchUrl = 'api/_search/articles'; //elasticsearch

    constructor(private http: Http) { }

    create(article: Article): Observable<Article> {
        const copy = this.convert(article);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(article: Article): Observable<Article> {
        const copy = this.convert(article);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Article> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    findArticlesByCodeoflawShortTitle(shorttitle: string): Observable<any> {
        console.log("findArticlesByCodeoflawShortTitle: "+shorttitle);
        const params: URLSearchParams = new URLSearchParams();
        params.set('shorttitle', shorttitle);

        return this.http.get('api/articlesLike', {
            search: params
        }).map((res: Response) => res);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(article: Article): Article {
        const copy: Article = Object.assign({}, article);
        return copy;
    }
}
