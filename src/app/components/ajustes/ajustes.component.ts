import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit, DoCheck {

  public userForm!: FormGroup;
  public srcImage: any ;
  public passwordValue: string = "**************";
  public user: any;
  public token: any;
  public status!: boolean
  public imageFilenew: any;

  constructor(

    private _userService: UserService,
    private _fb: FormBuilder,

  ) {

    this.user = _userService.getUser()
    this.token = _userService.getToken()
    this.userForm = _fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", Validators.required],
      image: [""]
    })
  }

  ngOnInit(): void {
    this.setFormulario();
    if (this.user["image"]) {
      this.srcImage = global.url + "avatar/" + this.user["image"]
    } else{
      this.srcImage = "../../../assets/images/user-default.png"
    }
  }

  ngDoCheck(): void {
    this.user = this._userService.getUser();
    this.token = this._userService.getToken();
  }

  setFormulario(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].setValue(this.user[key])
    })
  }

  onSubmit(): void {
    if (this.imageFilenew) {
      this._userService.uploadImageUser(this.imageFilenew, this.token).subscribe({
        next: (response: any) => {
  
          if (response.code == 200) {
            this.userForm.controls["image"].setValue(response.image)
            this.updateUser()
          } else {
            this.status = false
          }
  
        }
      })
    } else{
      this.updateUser()
    }
    
  }

  updateUser(): void{
   
    this._userService.updateuser(this.userForm.value, this.token).subscribe({
      next: (updateResponse: any) => {

        if (updateResponse.code == 200) {
          this.status = true

          localStorage.setItem("user", JSON.stringify(updateResponse.user))
          localStorage.setItem("token", updateResponse.token)


        } else{
          this.status = false
        }
      }
    })
  }

  uploadimage(e: any): void {
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.srcImage = event.target.result;
      }
      this.imageFilenew = e.target.files[0];
    }
  }



}
