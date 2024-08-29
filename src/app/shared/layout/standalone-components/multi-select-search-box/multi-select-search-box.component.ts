import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-multi-select-search-box',
  standalone: true,
  imports: [MultiSelectModule, FormsModule],
  templateUrl: './multi-select-search-box.component.html',
  styleUrl: './multi-select-search-box.component.scss',
})
export class MultiSelectSearchBoxComponent implements OnChanges {
  @Input() optionsList: Array<{ name: any }> = [];
  @Input() intialSelectedOptions: string[] = [];
  @Output() selectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() filter: EventEmitter<any> = new EventEmitter();

  selectedOptionsList: any[] = [];
  searchValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['intialSelectedOptions']) {
      this.mapSelectedArrayToObject();
    }
    if (changes['optionsList']) {
      if (!this.optionsList.some((item: any) => item.name == this.searchValue))
        this.optionsList.push({ name: this.searchValue });
    }
    this.optionsList = this.optionsList.concat(this.selectedOptionsList);
    this.removeOptionsListDuplication();
  }

  handleSelection() {
    this.selectChange.emit(this.selectedArrayValues);
  }

  handleFilteredValue(element: any) {
    this.searchValue = element.filter;
    this.filter.emit(this.searchValue);
  }

  get selectedArrayValues(): string[] {
    return this.selectedOptionsList?.map((option) => option.name) as string[];
  }

  mapSelectedArrayToObject() {
    this.selectedOptionsList = this.intialSelectedOptions?.map((name) => ({
      name,
    }));
  }

  removeOptionsListDuplication() {
    this.optionsList = Array.from(
      new Set(this.optionsList.map((item) => item.name))
    ).map((name) => ({ name }));
  }
}
