import { Component, OnInit } from '@angular/core';
import { Country, HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss'],
})
export class SummaryTableComponent implements OnInit {

  constructor(public httpService: HttpRequestsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.httpService.pullRequest();
  }


}
