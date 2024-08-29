import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-cart',
  standalone: true,
  imports: [],
  templateUrl: './home-cart.component.html',
  styleUrl: './home-cart.component.scss',
})
export class HomeCartComponent {
  @Input() imgSrc: string = '';
  @Input() cartTitle: string = '';
  @Input() cartBody: string = '';
  @Input() cartReversed: boolean = false;

  // ============================
  //   @Input() imgSrc: string = `assets\\imgs\\onbording\\Profiling-rafiki(1).svg`;
  //   @Input() cartTitle: string = 'Access a Wealth of Talent';
  //   @Input() cartBody: string = `   Tap into our extensive candidate database
  //   brimming with top-tier talent, ready to propel your
  //   team forward.`;
  //   @Input() cartReversed: boolean = true;
}
