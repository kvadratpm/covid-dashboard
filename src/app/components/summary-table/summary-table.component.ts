import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Global, Country, HttpRequestsService } from 'src/app/services/http-requests.service';
import { AppStateService } from 'src/app/services/app-state.service';
import { state } from '@angular/animations';

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

  constructor(private httpService: HttpRequestsService, public appState: AppStateService) {
  }

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

  setCurrentCountry(country: string): void {
    this.appState.currentCountry = country;
    this.countries.forEach((elem) => {
      if (elem.Country === this.appState.currentCountry) {
        this.appState.currentCountryObj = elem;
        return;
      }
    });
  }
}
