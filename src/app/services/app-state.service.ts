import { Injectable } from '@angular/core';
import { Country, Global } from 'src/app/services/http-requests.service';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  allTime: Array<keyof Global> = [
      'TotalConfirmed',
      'TotalDeaths',
      'TotalRecovered',
  ];
  today: Array<keyof Global> = [
      'NewConfirmed',
      'NewDeaths',
      'NewRecovered',
  ];

  statNum = 0;

  currentStat!: keyof Global;

  currentField!: string;

  currentCountry = '';

  currentCountryObj!: Country;

  statsForToday = false;

  statsForPoopulation = false;


  constructor() {
    this.currentStat = this.statsForToday ? this.today[this.statNum] : this.allTime[this.statNum];
  }

  upState(): void {
    this.statNum = this.statNum === this.allTime.length - 1 ? 0 : this.statNum += 1;
    this.currentStat = this.statsForToday ? this.today[this.statNum] : this.allTime[this.statNum];
  }

  downState(): void {
    this.statNum = this.statNum === 0 ? this.statNum = 2 : this.statNum -= 1;
    this.currentStat = this.statsForToday ? this.today[this.statNum] : this.allTime[this.statNum];
  }

  changeToday(): void {
    this.statsForToday = this.statsForToday ? false : true;
    this.upState();
    this.downState();
  }

  changePopulation(): void {
    this.statsForPoopulation = this.statsForPoopulation ? false : true;
    this.upState();
    this.downState();
  }

}
