import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CompleteProfileService } from '../../../../modules/job-seeker/complete-profile/complete-profile.service';
import { RetrieveJobSeekerDataService } from '../../../../modules/job-seeker/retrieve-job-seeker-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-selection-squares',
  templateUrl: './multi-selection-squares.component.html',
  styleUrl: './multi-selection-squares.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class MultiSelectionSquaresComponent implements OnInit {
  ngOnInit(): void {
    // this.retriveSelectedJobTypes();
  }

  // jobSeekerProfileService = inject(CompleteProfileService);

  // retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);

  @Input() OptionsList: any[] = [];
  @Input() selectedOptionsList: any[] = [];
  @Output() selectChange: EventEmitter<any> = new EventEmitter<any>();

  handleSelectedValues(item: any) {
    for (let i = 0; i < this.selectedOptionsList.length; i++) {
      if (this.selectedOptionsList[i] == item) {
        this.selectedOptionsList.splice(i, 1);
        this.selectChange.emit(this.selectedOptionsList);
        return;
      }
    }
    this.selectedOptionsList.push(item);
    this.selectChange.emit(this.selectedOptionsList);
  }

  // checkBoxToggleCheck(item: { name: string; value: string; checked: boolean }) {
  //   item.checked = !item.checked;
  //   let selectedCheckBoxes = this.getSelectedCheckBoxes(this.jobTypes);
  //   this.selectedOptionChange.emit(selectedCheckBoxes);

  //   // Validation
  //   if (selectedCheckBoxes.length == 0) this.isJobsTypesValid = false;
  //   else this.isJobsTypesValid = true;
  // }

  // retriveSelectedJobTypes() {
  //   if (this.selectedOptionsList.length == 0) return;

  //   this.jobTypes.forEach((type, index) => {
  //     if (this.selectedOptionsList.includes(type.name)) {
  //       this.jobTypes[index].checked = true;
  //     }
  //   });

  //   // Change Vlidation
  //   this.isJobsTypesValid = true;
  // }

  // getSelectedCheckBoxes(
  //   data: Array<{ name: string; checked: boolean }>
  // ): Array<string> {
  //   let selectedCheckBoxes: Array<string> = [];
  //   data.forEach((item) => {
  //     if (item.checked) {
  //       selectedCheckBoxes.push(item.name);
  //     }
  //   });

  //   return selectedCheckBoxes;
  // }
}
