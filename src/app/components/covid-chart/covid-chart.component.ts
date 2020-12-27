import { Component, OnInit } from '@angular/core';
import { Chart, ChartColor } from 'chart.js';
import { AppStateService } from 'src/app/services/app-state.service';

import {Summary, HttpRequestsService, Global, Country} from '../../services/http-requests.service';

@Component({
  selector: 'app-covid-chart',
  templateUrl: './covid-chart.component.html',
  styleUrls: ['./covid-chart.component.scss']
})

export class CovidChartComponent implements OnInit {

  global: Global | undefined;
  countries: Country[] | undefined;
  public chartType = 'Deaths';
  private types = ['Confirmed', 'Deaths', 'Recovered'];
  private i = 1;

  constructor(private httpService: HttpRequestsService, public appState: AppStateService) {}



  go(n: number): void {
    this.i = this.i + n;
    if (this.i > 2){
      this.i = 3 - this.i;

    } else if (this.i < 0){
      this.i = 1 - this.i;
    }



    this.chartType = this.types[this.i];
    this.draw();

  }
  ngOnInit(): void {
 this.draw();
  }

  draw(): void{
    const type = this.chartType;
    let color: ChartColor;
    if (type === 'Confirmed'){
      color = 'rgba(255, 99, 71, 1)';
    } else if (type === 'Recovered'){
      color = '#31E981';
    }
    const url = 'https://api.covid19api.com/country/russia/status/';
    this.httpService.GET<Summary>(url + type.toLowerCase()).subscribe(summary => {
      const covidData: any = summary;
      const len: number = covidData.length;

      const myChart = new Chart('my-chart', {
        type: 'line',
        data: {
            labels: [
              covidData[len - 7].Date.slice(0, 10).replace(/-/gi, '.'),
              covidData[len - 6].Date.slice(0, 10).replace(/-/gi, '.'),
              covidData[len - 5].Date.slice(0, 10).replace(/-/gi, '.'),
              covidData[len - 4].Date.slice(0, 10).replace(/-/gi, '.'),
              covidData[len - 3].Date.slice(0, 10).replace(/-/gi, '.'),
              covidData[len - 2].Date.slice(0, 10).replace(/-/gi, '.'),
              covidData[len - 1].Date.slice(0, 10).replace(/-/gi, '.'),
            ],
            datasets: [{
                label: type,
                data: [
                  covidData[len - 7].Cases,
                  covidData[len - 6].Cases,
                  covidData[len - 5].Cases,
                  covidData[len - 4].Cases,
                  covidData[len - 3].Cases,
                  covidData[len - 2].Cases,
                  covidData[len - 1].Cases,
                ],
                backgroundColor: [
                    color,
                ],
                borderColor: [
                    color,
                    color,
                    color,
                    color,
                    color,
                    color,
                    color,
                ],
                borderWidth: 0
            }]
        },
        options: {
          legend: {
            labels: {
                fontColor: 'wheat'
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: false,
                fontColor: 'wheat',
            }
            }],
              yAxes: [{
                  ticks: {
                      beginAtZero: false,
                      fontColor: 'wheat',
                  }
              }]
          }
        }
      });

    });

  }

}


