import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit, DoCheck {

  public user: any
  public token: any
  public topics: any
  public comment: any
  public status!: boolean
  public global: any

  constructor(

    private _topicService: TopicService,
    private _urlParamas: ActivatedRoute,
    private _userService: UserService

  ) {
    this.user = _userService.getUser();
    this.token = _userService.getToken();
    this.getTopics();
    this.global = global
  }

  ngDoCheck(): void {
    this.user = this._userService.getUser()
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
  }

  submitComment(): void{
    if (this.comment) {
      console.log(this.comment);
    }
  }

  getTopics(): void {
    this._urlParamas.params.subscribe({
      next: (response: any) => {

        this._topicService.getTopicPage(response.id).subscribe({
          next: (response: any) => {
            console.log(response);

            if (response.code == 200) {
              this.topics = response.topics
            } else {
              this.status = false
            }
          }
        })
      }
    })
  }

}
