import { FormCommentType } from './../../../../shared/models/app/form-comment-type.enum';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { OfferComment } from '../../../../shared/models/app/offerComment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppEvaluationService } from '../../services/app-evaluation.service';
import { AppOfferService } from '../../services/app-offer.service';
import { AppCommentService } from '../../services/app-comment.service';
import { AppCommentType } from '../../../../shared/models/app/AppCommentType';
import { AppComment } from '../../../../shared/models/app/appComment';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent implements OnInit , OnChanges {
  @Output() hideFromEvent:EventEmitter<boolean> = new EventEmitter() ;

  @Input() applicationId : string = '' ;
  @Input() offerId:string = '' ;
  @Input() oldComment !: OfferComment |AppComment| any   ;
  @Input() commentType:FormCommentType = FormCommentType.NORMAL;

  fb = inject(FormBuilder);
  employerAppsService = inject(AppEvaluationService);
  appOfferService = inject(AppOfferService);
  appCommentService = inject(AppCommentService)
  FormCommentType = FormCommentType
  AppCommentType = AppCommentType

  commentForm = this.fb.group({
    comment: ['' , Validators.required]
  })

  get commentContent(){
    return this.commentForm.controls.comment ;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['oldComment']){
      if(this.oldComment?.id){
        // this.setOfferOldData(this.oldComment)
      }
    }
  }


  setOldcommentToEdit(){
    this.commentForm.setValue({
      comment: this.oldComment?.content as string
    })
  }


  addOfferComment(content: string) {
    const comment : OfferComment= {
      content: content,
      offerId:this.offerId
    }
    console.log(this.offerId)
    this.appOfferService.addOfferComment(comment)
    .subscribe({
      next: (res) => {
        console.log("Comment Added" , res);
        this.commentForm.reset() ;
        this.hideForm() ;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  addCommentToApplication(commentContent:string , type:AppCommentType) {
    const comment :AppComment = {
      applicationId: this.applicationId,
      type: type,
      content: commentContent,
    }
    this.appCommentService.addComment(comment)
    .subscribe({
      next: (res) => {
        console.log(this.applicationId);
        console.log(res);
        this.commentForm.reset() ;
        this.hideForm() ;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  submitForm(){
    if(this.commentType === FormCommentType.OFFER){
      this.addOfferComment(this.commentContent.value as string)
    }else{
      this.addCommentToApplication(this.commentContent.value as string , this.oldComment.type)
    }
  }


  hideForm(){
    this.hideFromEvent.emit(true)
    this.oldComment = null ;
  }
}
