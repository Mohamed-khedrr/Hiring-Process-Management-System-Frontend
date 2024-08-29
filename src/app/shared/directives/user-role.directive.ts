import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'; 
import { TokenService } from '../services/token.service';

@Directive({
  selector: '[hasRoles]',
})
export class UserRoleDirective implements OnInit {
  private _hasRoles: string[] | undefined;

  constructor(
    private el: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const isRoleValid = this.checkRoles();
    if (isRoleValid) {
      console.log('Has Role');
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      console.log('Not Has Role');
      this.viewContainer.clear();
    }
  }

  private checkRoles(): boolean {
    if (
      !this.hasRoles ||
      !Array.isArray(this.hasRoles) ||
      this.hasRoles.length === 0
    ) {
      return false;
    }

    const userRoles = this.tokenService.getUserRoles();
    if (userRoles == null) {
      return false;
    }

    return this.hasRoles.some((role) => userRoles.includes(role));
  }

  @Input('hasRoles')
  set hasRoles(value: string[] | undefined) {
    this._hasRoles = value;
  }

  get hasRoles(): string[] | undefined {
    return this._hasRoles;
  }
}
