import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-stage-counter',
  templateUrl: './stage-counter.component.html',
  styleUrl: './stage-counter.component.scss',
})
export class StageCounterComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  currentStage: number = 1;

  ngOnInit(): void {
    if (this.route.snapshot.url[0]?.path == 'second') {
      this.currentStage = 2;
    } else if (this.route.snapshot.url[0]?.path == 'third') {
      this.currentStage = 3;
    }
  }
}
