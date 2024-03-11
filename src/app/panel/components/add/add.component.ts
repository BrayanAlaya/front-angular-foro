import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public topicForm!: FormGroup
  public token: any
  public user: any
  public status!: boolean

  constructor(
    private _topicService: TopicService,
    private _userService: UserService,
    private _fb: FormBuilder
  ) {
    this.token = _userService.getToken()
    this.user = _userService.getUser()
    this.topicForm = _fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
      code: [""],
      lang: [""],
      user: [this.user._id]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this._topicService.saveTopic(this.token, this.topicForm.value).subscribe({
      next: (response: any) => {
      
        if (response.code == 200) {
          
          this.topicForm.reset()
          this.status = true

        } else{
          this.status = false
        }
      }
    })
  }

}
