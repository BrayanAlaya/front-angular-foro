import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard implements CanActivate {

  constructor(
    private _userService: UserService,
    private _router: Router
  ){

  }

  canActivate() {

    const user = this._userService.getUser();

    if (user) {
      return true;      
    } else{

      this._router.navigate(['/'])
      return false;
    }

  }
  
}
