import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../models/Topic';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private _http: HttpClient
  ) { }

  saveTopic(token: any, topic: Topic): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token) 
    return this._http.post(global.url+"topic", topic, {headers: headers})
  }

  getTopicsByUser(userId: any): Observable<any> {

    return this._http.get(global.url + "user/topic/" + userId)
  }

  getTopic(topicId: any): Observable<any>{
    return this._http.get(global.url + "topic/" + topicId)
  }

  updateTopic(topicNew: Topic, topicId: any, token: any):Observable<any>{
    
    const header = new HttpHeaders().set("Authorization", token)

    return this._http.post(global.url + "topic/"+ topicId, topicNew, {headers: header})
  }

  deleteTopic(id: any, token: any): Observable<any>{

    const header = new HttpHeaders().set("Authorization", token)

    return this._http.delete(global.url + "topic/" + id, {headers: header})
  }
  

}
