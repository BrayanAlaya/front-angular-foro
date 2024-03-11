import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public status!: boolean
  public token: any
  public user: any
  public topicForm: FormGroup
  public topicId: any

  constructor(

    private _topicService: TopicService,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _getParams: ActivatedRoute

  ) {
    
    this.token = _userService.getToken(); 
    this.user = _userService.getUser(); 
    _getParams.params.subscribe({
      next: (response: any) => {
        this.topicId = response.id
      }
    });
    this.topicForm = _fb.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      code: [""],
      lang: [""]
    });

    this.fillTopicForm();

  }

  fillTopicForm():void{
    this._topicService.getTopic(this.topicId).subscribe({
      next: (response: any) => {
        if (response.code == 200) {
          Object.keys(this.topicForm.controls).forEach(key => {
            this.topicForm.controls[key].setValue(response.topic[key])
          })
        }
      }
    })
  }

  onSubmit(): void{
    this._topicService.updateTopic(this.topicForm.value, this.topicId, this.token).subscribe({
      next: (response: any) => {
        
        console.log(response);
        
      }
    })
  }

  ngOnInit(): void {
  }

}
