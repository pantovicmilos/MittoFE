import { Component, OnInit } from '@angular/core';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MittoFE';

  constructor(private helperService: HelperService) { }

  async ngOnInit() {
    await this.helperService.loadCountries();
  }
}
