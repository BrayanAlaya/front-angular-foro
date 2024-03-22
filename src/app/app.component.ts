import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {

  public token: any;
  public user: any;
  public imageSrc: any;

  constructor(
    private _userService: UserService,
    private _route: Router
  ) {
    this.token = _userService.getToken()
    this.user = _userService.getUser()
  }

  ngOnInit(): void {

  }

  searchTopics(string: any): void {
    if (string.length > 0) {
      this._route.navigate(["/search/topic", string])
    }
  }

  ngDoCheck(): void {
    this.token = this._userService.getToken()
    this.user = this._userService.getUser()

    if (this.user) {
      if (this.user.image) {
        this.imageSrc = global.url + "avatar/" + this.user.image 
      }
    }
  }

  logOut() {
    localStorage.clear()
    this.token = null
    this.user = null
  }

}
