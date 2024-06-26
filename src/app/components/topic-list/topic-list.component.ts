import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { CommentsService } from 'src/app/services/comments.service';
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
  public status!: boolean
  public global: any
  public actualPage: any
  public totalPages: any
  public totalPagesArray: (number)[] = []

  constructor(

    private _topicService: TopicService,
    private _urlParamas: ActivatedRoute,
    private _userService: UserService,
    private _commentService: CommentsService

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
    this._urlParamas.params.subscribe({
      next: (response: any) => {
        this._topicService.getTopicPage(response.id).subscribe({
          next: (response: any) => {
            if (response.code == 200) {
              this.topics = response.topics
              this.actualPage = response.page
              this.totalPages = response.totalPages

              let contadorPaginas = 0;

              if (this.totalPages % 2 == 0) {
                contadorPaginas = 4
              } else {
                contadorPaginas = 3
              }

              this.totalPagesArray = [];

              for (let index = parseInt((this.totalPages / 2).toFixed()) - contadorPaginas; index < Math.round(this.totalPages / 2); index++) {
                this.totalPagesArray.push(index + (contadorPaginas - 1));
              }
            } else {
              this.status = false
            }
          }
        })
      }
    })
  }

}
