import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country, HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss'],
})
export class SummaryTableComponent implements OnInit {

  currentField!: string;
  form!: FormGroup;

  constructor(public httpService: HttpRequestsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.httpService.pullRequest();
    this.form = new FormGroup({
      country: new FormControl('')
    });
  }

  submit(): void {
    console.log(this.form);
  }
}
