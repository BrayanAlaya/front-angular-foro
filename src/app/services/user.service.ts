import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { global } from './global';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: any;
  public token: any;

  constructor(

    private _http: HttpClient

  ) {

  }

  saveUser(user: User): Observable<any>{
    return this._http.post(global.url+"register", user)
  }

  loginUser(user: User, token: boolean = true): Observable<any>{
    user.getToken = token
    return this._http.post(global.url+"login", user)
  }

  getToken(){
    let token = localStorage.getItem("token");
    if (token) {
      this.token = token
    } else{
      this.token = null  
    }
    return this.token
  }

  getUser(){
    let user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user)
    } else{
      this.user = null  
    }
    return this.user
  }

  updateuser(user: User, token: any):Observable<any>{

    let headers = new HttpHeaders().set("Authorization", token);

    return this._http.put(global.url+"update", user, {headers: headers})
  }

  uploadImageUser(file: any, token: any):Observable<any>{

    const header = new HttpHeaders().set("Authorization", token)
    const formData = new FormData();
    formData.append("file0",file);
    return this._http.post(global.url+"upload-avatar", formData, {headers: header})
  }

}
