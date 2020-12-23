import { Injectable } from '@angular/core';
import { Global } from 'src/app/services/http-requests.service';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  stats: Array<keyof Global> = [
    'TotalConfirmed',
    'TotalDeaths',
    'TotalRecovered',
    'NewConfirmed',
    'NewDeaths',
    'NewRecovered'
  ];

  statNum = 0;

  currentStat!: keyof Global;

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
