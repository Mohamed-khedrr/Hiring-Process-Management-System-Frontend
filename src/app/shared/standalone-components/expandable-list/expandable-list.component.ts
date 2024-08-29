import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.scss'],
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,FormsModule ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExpandableListComponent),
      multi: true
    }
  ],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ExpandableListComponent implements ControlValueAccessor, OnInit {
 
  @Input() items: any[] = [];
  @Input() initialCount: number = 4; 
  @Input() formControl !: FormControl;
  isCollapsed: boolean = true;
  selectedItem : any;
  constructor() { }

  ngOnInit(): void {}

  writeValue(value: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onCheckChange(item: any) {
    this.selectedItem = item;
    this.onChange(item);  
  }
  
  onChange: any = () => {}; 
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  
}
