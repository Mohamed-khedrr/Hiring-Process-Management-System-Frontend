import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { AppTimelineService } from '../../services/app-timeline.service';
import { TimelineEventResponse } from '../../../../shared/models/app/timeline-response';
import { TimelineEventType } from '../../../../shared/models/app/TimelineEventType';
import { CommonModule } from '@angular/common';
import { PublicPipesSharedModuleModule } from '../../../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { ApplicationStatus } from '../../../../shared/models/app/ApplicationStatus';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  standalone:true ,
  imports : [
    CommonModule,
    PublicPipesSharedModuleModule
  ]
})
export class TimelineComponent {

  timelineService = inject(AppTimelineService)
  @Input() applicationId!: string;
  timelineEvents!: Array<TimelineEventResponse>
  EventType = TimelineEventType
  ApplicationStatus = ApplicationStatus

  ngOnInit() {

    this.getTimelineForApplication()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['applicationId']){
      this.getTimelineForApplication()
    }
  }


  getTimelineForApplication() {
    this.timelineService.getTimelineApplications(this.applicationId)
    .subscribe({
      next: (res) => {
        this.timelineEvents = res.body
        console.log(res);        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
