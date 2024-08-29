import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, count } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private http = inject(HttpClient);

  private config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
  };

  loadCountries(): Observable<any> {
    let apiEndPoint = this.config.cUrl;
    return this.http.get(apiEndPoint, {
      headers: { 'X-CSCAPI-KEY': this.config.ckey },
    });
  }

  loadStates(selectedCountryCode: String): Observable<any> {
    return this.http.get(`${this.config.cUrl}/${selectedCountryCode}/states`, {
      headers: { 'X-CSCAPI-KEY': this.config.ckey },
    });
  }

  loadCities(selectedCountryCode: String, selectedStateCode: String) {
    return this.http.get(
      `${this.config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
      { headers: { 'X-CSCAPI-KEY': this.config.ckey } }
    );
  }

  getLocationName(
    iso2: string,
    locationList: { name: string; iso2: string }[]
  ): string {
    for (let i = 0; i < locationList.length; i++) {
      if (locationList[i].iso2 === iso2) {
        return locationList[i].name;
      }
    }
    return '';
  }
  getLocationIso(
    name: string,
    locationList: { name: string; iso2: string }[]
  ): string {
    for (let i = 0; i < locationList.length; i++) {
      if (locationList[i].name == name) {
        return locationList[i].iso2;
      }
    }
    return '';
  }
}
