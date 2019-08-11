import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { GetStatisticsRequest } from 'src/app/models/dtos';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  viewModel: GetStatisticsRequest = new GetStatisticsRequest();
  mccFilterValues: Array<string> = ['262', '232', '260'];
  columns: any[] = [{field: 'day'}, {field: 'mcc'}, {field: 'pricePerSms'}, {field: 'count'}, {field: 'totalPrice'}];
  gridData: any[];
  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  constructor(private apiService: ApiService, private helperService: HelperService) {
  }

  ngOnInit() {
    this.setInitQuery();
    this.loadStatistics();
  }

  async loadStatistics() {
    const result = await this.apiService.getStatistics(this.viewModel);
    result.statisticsItems.map(x => {
      x.mcc = this.helperService.addCountryName(x.mcc);
    });
    this.gridData = result.statisticsItems;
  }

  setInitQuery() {
    this.viewModel.mccList = [];
    this.viewModel.dateFrom = this.helperService.getDateString(this.dateFrom);
    this.viewModel.dateTo = this.helperService.getDateString(this.dateTo);
  }

  filterDateFrom(date) {
    this.viewModel.dateFrom = this.helperService.getDateString(date);
    this.loadStatistics();
  }

  filterDateTo(date) {
    this.viewModel.dateTo = this.helperService.getDateString(date);
    this.loadStatistics();
  }

  filterMcc(value) {
    this.viewModel.mccList = value;
    this.loadStatistics();
  }
}
