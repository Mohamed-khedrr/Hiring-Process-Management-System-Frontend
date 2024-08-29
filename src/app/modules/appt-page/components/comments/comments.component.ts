import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { AppCommentService } from '../../services/app-comment.service';
import { AppCommentType } from '../../../../shared/models/app/AppCommentType';
import { AppComment } from '../../../../shared/models/app/appComment';
import { CommonModule } from '@angular/common';
import { PublicPipesSharedModuleModule } from '../../../../shared/pipes/public-pipes/public-pipes-shared-module.module';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  standalone:true ,
  imports : [
    CommonModule,
    PublicPipesSharedModuleModule
  ]
})
export class CommentsComponent implements OnInit , OnChanges {

  @Input() applicationId: any;
  @Input() isFormDestroyed: any;

  AppCommentType = AppCommentType

  appCommentService = inject(AppCommentService)
  commentId: any;
  allComments :AppComment[] | null  = null;

  ngOnInit() {
    // this.commentId = "1841f84b-7754-4920-952a-0bb56540326b"
    // this.addCommentToApplication()
    this.getAllCommentsForApplication()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isFormDestroyed']){
      this.getAllCommentsForApplication()
    }
  }

  exampleApplicationComment: AppComment = {
    type: AppCommentType.Elevation, // Example comment type
    content: 'This is a sample comment.',
    applicationId: '074bdd73-1ffb-423c-bdf9-4b6416cbee72' // Example UUID for application
  };



  getAllCommentsForApplication() {
    this.appCommentService.getCommentsForApplication(this.applicationId)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.allComments = (res.body as AppComment[]).sort((a , b) => (new Date(a?.createdAt as string).getTime() - new Date(b?.createdAt as string).getTime())).reverse();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  calcPeriod(date: string): string {
    const today = new Date();
    const createDate = new Date(date);

    const diffTime = (today.getTime() - createDate.getTime()) / 1000;

    if (diffTime < 60) {
      return `now`;
    } else if (diffTime < 3600) {
      return `${Math.floor(diffTime / 60)} minutes ago`;
    } else if (diffTime < 86400) {
      return `${Math.floor(diffTime / 3600)} hours ago`;
    } else if (diffTime < 2592000) {
      return `${Math.floor(diffTime / 86400)} days ago`;
    } else if (diffTime < 31536000) {
      return `${Math.floor(diffTime / 2592000)} months ago`;
    } else {
      return `${Math.floor(diffTime / 31536000)} years ago`;
    }
  }


}
