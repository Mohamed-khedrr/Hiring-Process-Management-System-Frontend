import { Injectable } from '@angular/core';
import { LoaderData } from '../models/common/loaderData';
import { LoaderType } from '../enum/loader-type.enum';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  loadersCount: number = 0;
  isLoading: boolean = false;
  loaderType: LoaderType = LoaderType.none;
  constructor() {}

  showLoader(loader: LoaderData) {
    // Validate Type Of Loader
    if (loader.loaderType == LoaderType.none) return;

    // Is it The first Loader
    if (this.loadersCount === 0) {
      console.log('Loader Type ', this.loaderType);
      this.loadersCount++;
      this.loaderType = loader.loaderType as LoaderType;
      this.displayLoder();
      // if (this.loadersCount > 0) {
      //    this.loadingSpinner$.present();
      // }
    } else {
      // Is The new Loader same type of current
      if (this.loaderType == loader.loaderType) this.loadersCount++;
      else {
        // Change Loader Type
        this.resetLoader();
        this.loaderType = loader.loaderType as LoaderType;
        this.loadersCount++;
      }
    }
  }

  closeLoader() {
    if (this.loadersCount === 0) return;
    else if (this.loadersCount === 1) {
      this.loadersCount--;
      console.log('closing');
      this.hideLoader();
      // if (this.loadingSpinner$) {
      //   this.loadingSpinner$.dismiss();
      // }
    } else {
      this.loadersCount--;
    }
  }

  resetLoader() {
    this.loadersCount = 0;
    this.loaderType = LoaderType.none;
  }

  displayLoder() {
    this.isLoading = true;
  }
  
  hideLoader() {
    console.log('closing Loader');
    this.isLoading = false;
  }
}
