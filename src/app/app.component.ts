import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';

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
    private _userService: UserService
  ) {
    this.token = _userService.getToken()
    this.user = _userService.getUser()
  }

  ngOnInit(): void {
   
  }

  ngDoCheck(): void {
    this.token = this._userService.getToken()
    this.user = this._userService.getUser()
    if (this.user.image) {
      this.imageSrc = global.url + "avatar/" + this.user.image
    }
  }

  logOut() {
    localStorage.clear()
    this.token = null
    this.user = null
  }

}
