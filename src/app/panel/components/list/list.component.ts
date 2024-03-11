import { Component, OnInit } from '@angular/core';

import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public topics: any;
  public user: any;
  public token: any;

  constructor(

    private _topicService: TopicService,
    private _userService: UserService

  ) {
    this.user = _userService.getUser()
    this.token = _userService.getToken()
    this.getTopicsByUSer()
  }

  onDelete(id: any):void{

    this._topicService.deleteTopic(id, this.token).subscribe({
      next: (response: any) => {
        if (response.code == 200) {
          this.getTopicsByUSer();
        }
      }
    })

  }

  getTopicsByUSer(): void {
    this._topicService.getTopicsByUser(this.user._id).subscribe({
      next: (response: any) => {
        this.topics = response.topics;
      }
    })
  }

  ngOnInit(): void {

  }



}
