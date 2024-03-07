import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user!: User
  public status!: boolean 
  public userForm: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService
  ) {
    this.userForm = this._fb.group({
      name: ["", [Validators.required, Validators.pattern("[a-zA-Zá-ý]*")]],
      surname: ["", [Validators.required, Validators.pattern("[a-zA-Zá-ý]*")]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this._userService.saveUser(this.userForm.value).subscribe({
        next: (response: any) => {
          if (response.code == 200) {

            this.status = true
            this.userForm.reset()

          } else{

            this.status = false

          }
        }
      })
    }

  }

}
