import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-single-selection-squares',
  imports: [CommonModule],
  templateUrl: './single-selection-squares.component.html',
  styleUrl: './single-selection-squares.component.scss',
  standalone: true,
})
export class SingleSelectionSquaresComponent implements OnInit {
  @Input() inputOptionsList: string[] = [];
  @Input() selectedOption: any = '';
  @Output() selectedOptionChange: EventEmitter<string> =
    new EventEmitter<string>();

  // Random name for input changes for each use of the component
  randomInputName!: string;

  constructor() {}

  ngOnInit(): void {
    this.randomInputName = this.generateRandomInputName();
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.selectedOptionChange.emit(option);
  }

  generateRandomInputName(): string {
    const length: number = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
