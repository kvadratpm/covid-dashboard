import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



export interface Summary {
  Global: Global;
  Countries: Country[];
}

export interface Country {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
  Premium: {};
}

export interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

@Injectable({
  providedIn: 'root'
})

export class HttpRequestsService {

  global!: Global;
  countries!: Country[];

  constructor(public http: HttpClient) {
  }

  pullRequest(): void {
    this.http.get<Summary>('https://api.covid19api.com/summary')
      .subscribe((response) => {
        this.global = response.Global;
        this.countries = response.Countries;
      });
  }

  get totalConfirmed(): {} {
    return this.global;
  }

  get countriesConfirmed(): Country[] {
    return this.countries;
  }

}
