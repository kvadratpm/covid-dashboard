import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Global, Country, HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss'],
})
export class SummaryTableComponent implements OnInit {

  currentField!: string;
  form!: FormGroup;
  global!: Global;
  countries!: Country[];
  loading = false;

  constructor(public httpService: HttpRequestsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.httpService.pullRequest()
      .subscribe((response) => {
        this.global = response.Global;
        this.countries = response.Countries;
        this.loading = false;
      });
  }

  submit(): void {
    console.log(this.form);
  }
}
