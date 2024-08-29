import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Question } from '../../../../shared/models/company/Question';
import { QuestionType } from '../../../../shared/models/company/QuestionType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobPostService } from '../job-post.service';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-job-post-second-stage',
  templateUrl: './job-post-second-stage.component.html',
  styleUrl: './job-post-second-stage.component.scss'
})
export class JobPostSecondStageComponent implements OnInit {
  isLoaded = false ; 
  id  :any;
  jobPost : any;
  hiringTeam !: any[] ;
  selectedRecruiters : any[]=[];  
  advancedSettingFrom !: FormGroup;
  questionList !: Question[] ;
  questionForm !: FormGroup;
  editQuestionForm !: FormGroup;
  selectedQuestion !: Question ;
  formSubmited = false ;
  editFormSubmited = false ;
  limit :any ;
  showDropdown = false;
  educationLevel: any;
  companyTeamMembers : any ; 
  jobAdmin : any;
  educationLevels : string[] = [
    'Not Specified',
    'High School',
    'Vocational',
    'Diploma',
    'Bachelor’s Degree',
    'Master’s Degree',
    'Doctorate Degree'
  ];
  gender: any ;
  genders : string[] = [
    "No Preference",
    "Male Only",
    "Female Only",
    "Male Preferred",
    "Female Preferred",
    "Vocational"
  ]

  @ViewChild('overlay') overlay !: ElementRef;
  @ViewChild('panel') panel !: ElementRef;
  @ViewChild('reviewApplication') reviewApplication !: ElementRef;
  constructor(private fb : FormBuilder,
              private router : Router,
              private jobPostService : JobPostService,
              private route : ActivatedRoute){}

  ngOnInit(): void { 
    this.createQuestionFrom();
    this.createEditQuestionFrom();
    this.createAdvncedSettingForm();
    this.route.params.subscribe(params => { 
      if (params['id']) {
        this.id = params['id']; 
        console.log(this.id);
        this.getJobPost(this.id);
      } 
    });
  }

  getJobPost(jobPostId : any){
    this.jobPostService.getJobPostAdvancedSetting(jobPostId).subscribe({
      next: res =>{
        this.updateUi(res.body);
      }, 
      error : err => {
        this.router.navigate(['/404'])
      }
    });
  }

 

  updateUi(resBody:any){
      console.log(resBody)
      this.jobPost = resBody ;
      this.jobAdmin = resBody.admin;
      this.hiringTeam = resBody.companyTeamMembers;
      this.selectedRecruiters = resBody.selectedTeamMembers;
      this.limit = resBody.maxApplication
      this.gender = resBody.gender;
      this.educationLevel = resBody.educationLevel;
      this.createInitQuestion(resBody.questionDtos); 
      this.isLoaded = true ; 
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  removeRecruiter(recruiter : any){
    this.selectedRecruiters = this.selectedRecruiters.filter(el => el.id != recruiter.id);
  }

  selectRecruiter(recruiter: any) {
    let isExsist = false ; 
    this.selectedRecruiters.forEach(el =>{ if(el.id == recruiter.id){
      isExsist = true ;
    }});
    if(!isExsist){
      this.selectedRecruiters.push(recruiter);
      this.showDropdown = false;
    }
  }

  handleSelectedEducationLevel(educationLevel: string) {
    console.log(educationLevel);
    this.educationLevel = educationLevel;
  }

  handleSelectedGender(gender: string) {
    console.log(gender);
    this.gender = gender;
  }

  createInitQuestion(questionDtos :any){
    this.questionList = [];
    if(questionDtos && questionDtos.length > 0){
      this.questionList = questionDtos;
      return;
    }
    const question1: Question = {
        question: "What make you our best choice?",
        questionType: QuestionType.TEXT_FREE,
    };
    const question2: Question = {
        question: "Ready to start immediately?",
        questionType: QuestionType.TRUE_OR_FALSE,
    };
    this.questionList.push(question1, question2);
  }

  createQuestionFrom(){
    this.questionForm = this.fb.group({
      question: ['', [Validators.required , Validators.maxLength(100),Validators.minLength(10)]] ,
      questionType: ['TEXT_FREE', [Validators.required]] ,
    });
  }

  createEditQuestionFrom(){
    this.editQuestionForm = this.fb.group({
      id : [''],
      question: ['', [Validators.required , Validators.maxLength(100),Validators.minLength(10)]] ,
      questionType: ['', [Validators.required]] ,
    });
  }

  addQuestion(){
    console.log(this.questionForm.value);
    this.formSubmited = true ;
    if(this.questionForm.valid){
      this.questionList.push(this.questionForm.value);
      this.questionForm.reset();
      this.formSubmited = false ; 
    }
  }

  deleteQuestion(question : any){
    console.log(question.question)
    this.questionList = this.questionList.filter(el => (el.question != question));
  }

  editQuestion(question : any ){
    this.editQuestionForm.setValue(question);
    this.selectedQuestion = question;
    this.overlay.nativeElement.classList.remove('hide');
    this.panel.nativeElement.classList.remove('hide')
  }

  saveEditedQuestion() {
    if (this.editQuestionForm.valid) {
      this.questionList.forEach(el => {
        if (el.question === this.selectedQuestion.question && el.questionType === this.selectedQuestion.questionType) {
          el.question = this.editQuestionForm.controls['question'].value; 
          el.questionType = this.editQuestionForm.controls['questionType'].value;  
        }
      });
      this.closePanale();  
    }
  }

  createAdvncedSettingForm(){
    this.advancedSettingFrom = this.fb.group({
      jobPostId:  [''],
      questionDtos: [''],
      maxApplication: [''],
      gender: [''],
      educationLevel: [''], 
      selectedTeamMembers: [''], 
      publish: [''], 
    });
  }

  closePanale(){
    this.overlay.nativeElement.classList.add('hide');
    this.panel.nativeElement.classList.add('hide');
  }
 
  showReivewApplication(){
    this.reviewApplication.nativeElement.classList.remove("hide");
    this.overlay.nativeElement.classList.remove('hide');
  }

  closeReview(){
    this.reviewApplication.nativeElement.classList.add("hide");
    this.overlay.nativeElement.classList.add('hide');
  }

  chooseGender(gender : string){
    console.log(gender);
  }

  onLimitChange(limit : any){
    this.limit = limit ; 
  }
  
  collectJobData(publish : boolean){
    const selectedRecruitersIds = this.selectedRecruiters.map(recruiter => recruiter.id);
    console.log(selectedRecruitersIds);
    return {
      jobPostId: this.jobPost.jobPostId ,
      questionDtos:this.questionList  ,
      maxApplication: this.limit ,
      gender: this.gender,
      educationLevel: this.educationLevel, 
      selectedTeamMembers: this.selectedRecruiters, 
      publish:publish  
    };
  }

  publishJob(){
    const jobDto = this.collectJobData(true);
    this.advancedSettingFrom.patchValue(jobDto);
    console.log(this.advancedSettingFrom.value)
 
     
     if(this.advancedSettingFrom.valid){
        this.jobPostService.publishOrSaveJob(this.advancedSettingFrom.value).subscribe(res => { 
          if(res.ok){this.router.navigate(['/company/job-posts'])
          }
        });
      }
     console.log(jobDto); 
  }

  saveDraft(){
    const jobDto = this.collectJobData(false);
    this.advancedSettingFrom.setValue(jobDto);
    if(this.advancedSettingFrom.valid){
      this.jobPostService.publishOrSaveJob(this.advancedSettingFrom.value).subscribe(res => { 
        if(res.ok){
          this.router.navigate(['/company/job-posts'])
        }
      });
    }
    console.log(jobDto);
  }

  deleteJob(){ 
    this.jobPostService.deleteNewJob(this.jobPost.jobPostId).subscribe(res=>{
      if(res.ok){
        this.router.navigate(['/company/job-posts'])
      }
    });
  }
 
  
}
