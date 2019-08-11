import { Injectable } from '@angular/core';
import { GetCountriesRequest, SendSmsRequest, GetSentSmsRequest, CountryDto,
  GetStatisticsRequest, ResponseStatus } from '../models/dtos';
import { JsonServiceClient } from '@servicestack/client';
import { NotificationService } from '@progress/kendo-angular-notification';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiEndpoint;
  client = new JsonServiceClient(this.apiUrl);
  countries: Array<CountryDto>;

  constructor(private notificationService: NotificationService) {  }

  async getCountries() {
    const req = new GetCountriesRequest();
    const res = await this.client.get(req);
    return res;
  }

  async sendNewMessage(payload: SendSmsRequest) {
    const req = payload;
    try {
      const res = await this.client.get(req);
      return res;
    } catch (e) {
      this.handleErrors(e.responseStatus);
    }
  }

  async getSentSms(payload: GetSentSmsRequest) {
    const req = payload;
    try {
      const res = await this.client.get(req);
      return res;
    } catch (e) {
      this.handleErrors(e.responseStatus);
    }

  }

  async getStatistics(payload: GetStatisticsRequest) {
    const req = payload;
    try {
      const res = await this.client.get(req);
      return res;
    } catch (e) {
      this.handleErrors(e.responseStatus);
    }
  }

  showWarning(text): void {
    this.notificationService.show({
        content: text,
        hideAfter: 4000,
        position: { horizontal: 'center', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'warning', icon: true }
    });
  }

  handleErrors(responseStatus: ResponseStatus) {
    responseStatus.errors.map(x => {
      this.showWarning(x.message);
    });
  }
}
