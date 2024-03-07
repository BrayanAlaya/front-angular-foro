import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup
  public status!: boolean

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _route: Router

  ) {
    this.userForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this._userService.loginUser(this.userForm.value).subscribe({
        next: (response: any) => {
          if (response.code == 200) {

            let token = response.data

            this._userService.loginUser(this.userForm.value, false).subscribe({
              next: (response: any) => {

                let info = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(info))
                this._route.navigate(["/"])

              }
            })


          } else{
            this.status = false
          }
        }
      })
    }
  }

}
