import { state } from '@angular/animations';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  stats: Array<string> = [
    'TotalConfirmed',
    'NewConfirmed',
    'NewDeaths',
    'TotalDeaths',
    'NewRecovered',
    'TotalRecovered',
  ];

  statNum = 0;

  currentStat!: string;

  currentField!: string;


  constructor() {
    this.currentStat = this.stats[this.statNum];
  }

  upState(): void {
    this.statNum = this.statNum === this.stats.length - 1 ? 0 : this.statNum += 1;
    this.currentStat = this.stats[this.statNum];
  }

  downState(): void {
    this.statNum = this.statNum === this.stats.length - 1 ? 0 : this.statNum += 1;
    this.currentStat = this.stats[this.statNum];
  }

}
