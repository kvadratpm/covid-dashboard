import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Global, Country, HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  currentField!: string;
  form!: FormGroup;
  global!: Global;
  countries!: Country[];
  loading = false;

  constructor(public httpService: HttpRequestsService) { }

  ngOnInit(): void {
    this.loading = true;
    const sub = this.httpService.pullRequest()
      .subscribe((response) => {
        this.global = response.Global;
        this.countries = response.Countries;
        this.loading = false;
        sub.unsubscribe();
      });
  }

}
