import { Injectable, ComponentRef } from '@angular/core'; 
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { RequestLoaderComponent } from '../layout/standalone-components/request-loader/request-loader.component';
 
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private overlayRef: OverlayRef | null = null;
  private spinnerRef: ComponentRef<RequestLoaderComponent> | null = null;

  constructor(private overlay: Overlay) { }

  show(showSpinner: boolean = true) {
    if (!showSpinner) return;

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        positionStrategy: this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically()
      });
      this.overlayRef.attach(new ComponentPortal(RequestLoaderComponent));
    }
  }

  hide() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
  
}

