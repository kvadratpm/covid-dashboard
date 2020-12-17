import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



export interface Summary {
  Global: {};
  Countries: Country[];
}

export interface Country {
  country: string;
  countryCode: string;
  slug: string;
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})

export class HttpRequestsService {

  summary: Summary = {
    Global: {},
    Countries: []
  };

  constructor(public http: HttpClient) {
  }

  pullRequest(): void {
    this.http.get<Summary>('https://api.covid19api.com/summary')
      .subscribe((response) => {
        this.summary.Global = response.Global;
        this.summary.Countries = response.Countries;
      });
  }

  get totalConfirmed(): {} {
    return this.summary.Global;
  }

  get countriesConfirmed(): Country[] {
    return this.summary.Countries;
  }

}
