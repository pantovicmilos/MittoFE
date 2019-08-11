import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GetSentSmsRequest, SentSmsDto } from 'src/app/models/dtos';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-sent-messages',
  templateUrl: './sent-messages.component.html',
  styleUrls: ['./sent-messages.component.css']
})
export class SentMessagesComponent implements OnInit {

  viewModel: GetSentSmsRequest = new GetSentSmsRequest();
  dateFrom: Date = new Date();
  timeFrom: Date = new Date();
  dateTo: Date = new Date();
  timeTo: Date = new Date();

  gridView: GridDataResult;
  data: Array<SentSmsDto> = [];

  constructor(private apiService: ApiService, private helperService: HelperService) { }

  ngOnInit() {
    this.setInitQuery();
    this.loadSentSms();
  }

  async loadSentSms() {
    const result = await this.apiService.getSentSms(this.viewModel);

    result.items.map(item => {
      item.dateTime = this.helperService.getLocalDateTimeStr(item.dateTime);
      item.mcc = this.helperService.addCountryName(item.mcc);
    });

    this.gridView = {
      data: result.items,
      total: result.totalCount
    };
  }



  setInitQuery() {
    this.viewModel.skip = 0,
    this.viewModel.take = 3,
    this.viewModel.dateTimeFrom = this.helperService.getUtcDateTime(this.dateFrom, this.timeFrom);
    this.viewModel.dateTimeTo = this.helperService.getUtcDateTime(this.dateTo, this.timeTo);
  }

  public pageChange(event: PageChangeEvent): void {
    this.viewModel.skip = event.skip;
    this.loadSentSms();
}

  dateFromChange(value) {
    this.viewModel.dateTimeFrom = this.helperService.getUtcDateTime(value, this.timeFrom);
    this.loadSentSms();
  }

  timeFromChange(value) {
    this.viewModel.dateTimeFrom = this.helperService.getUtcDateTime(this.dateFrom, value);
    this.loadSentSms();
  }

  dateToChange(value) {
    this.viewModel.dateTimeTo = this.helperService.getUtcDateTime(value, this.timeTo);
    this.loadSentSms();
  }

  timeToChange(value) {
    this.viewModel.dateTimeFrom = this.helperService.getUtcDateTime(this.dateTo, value);
    this.loadSentSms();
  }
}
