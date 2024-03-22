import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { CommentsService } from 'src/app/services/comments.service';
import { global } from 'src/app/services/global';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-topics',
  templateUrl: './search-topics.component.html',
  styleUrls: ['./search-topics.component.css']
})
export class SearchTopicsComponent implements OnInit, DoCheck {

  public topics: any
  public global: any
  public user: any
  public token: any

  constructor(

    private _paramsGet: ActivatedRoute,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentsService

  ) {
    this.user = _userService.getUser()
    this.token = _userService.getToken()
    this.global = global
    this.getTopics()
  }

  ngDoCheck(): void {
    this.user = this._userService.getUser()
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {

  }


  submitComment(id: any, comment: any): void {
    if (comment.length > 5) {

      const userComment: Comment = {
        id: "",
        content: comment,
        user: this.user.id,
        date: ""
      }

      this._commentService.saveComment(id, userComment, this.token).subscribe({
        next: (response: any) => {


          if (response.code == 200) {

            this.getTopics()
          }
        }
      })
    }
  }

  getTopics(): void {
    this._paramsGet.params.subscribe({
      next: (response: any) => {
        this._topicService.searchTopics(response.search).subscribe({
          next: (response: any) => {

            if (response.code == 200) {
              this.topics = response.topics

            }

          }
        })
      }
    })
  }

}
