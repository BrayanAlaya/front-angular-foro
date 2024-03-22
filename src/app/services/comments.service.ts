import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private _http: HttpClient
  ) {

  }

  saveComment(id: any, comment: Comment,token: any): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)

    return this._http.post(global.url + "/comment/topic/" + id, comment, {headers: headers})
  }

}
