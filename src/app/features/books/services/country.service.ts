import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryResult } from '../types/country';

const countryApiBase = 'https://restcountries.eu/rest/v2/name';
const countryFlagApi ='https://www.countryflags.io';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  http = inject(HttpClient);

  getCountry(code: string): Observable<CountryResult> {
    return this.http.get<CountryResult>(
      `${countryApiBase}/${code}?fullText=true`
    );
  }
}
