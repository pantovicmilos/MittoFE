import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CountryDto } from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private apiService: ApiService) { }

  countries: Array<CountryDto> = [];

  getDateString(date: Date): string {
    const stringDate = date.toISOString().substring(0, 10);
    return stringDate;
  }

  getUtcDateTime(date: Date, time: Date): string {
    const fullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
    time.getHours(), time.getMinutes(), time.getSeconds());
    const utcStringDate = fullDate.toISOString().substring(0, 19);
    return utcStringDate;
  }

  getLocalDateTimeStr(utcString: string): string {
    const localDate = new Date(`${utcString}.000Z`);
    const localString = localDate.toLocaleString();
    return localString;
  }

  addCountryName(mccCode: string): string {
    const name = this.countries.find(x => x.mcc === mccCode).name;
    const result = `${mccCode} - ${name}`;
    return result;
  }

  async loadCountries(): Promise<void> {
    const response = await this.apiService.getCountries();
    this.countries = response.countries;
  }
}
