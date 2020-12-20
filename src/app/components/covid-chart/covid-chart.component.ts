import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {Summary,HttpRequestsService, Global, Country} from "../../services/http-requests.service";
import { SelectorComponent } from '../selector/selector.component';

@Component({
  selector: 'app-covid-chart',
  templateUrl: './covid-chart.component.html',
  styleUrls: ['./covid-chart.component.scss'],
  providers: [SelectorComponent]
})

export class CovidChartComponent implements OnInit {

  global:Global | undefined;
  countries:Country[] | undefined;


  constructor(private httpService:HttpRequestsService, public type:SelectorComponent) {}

    ngOnInit() {
    const url = 'https://api.covid19api.com/country/russia/status/'

    
    this.httpService.GET<Summary>(url + 'deaths').subscribe(summary=>{
      const covid_data: any = summary;
      const len: number = covid_data.length;


      let myChart = new Chart("myChart", {

        type: 'line',
        data: {

            labels: [
              covid_data[len - 7].Date.slice(0,10).replace(/-/gi, '.'),
              covid_data[len - 6].Date.slice(0,10).replace(/-/gi, '.'),
              covid_data[len - 5].Date.slice(0,10).replace(/-/gi, '.'),
              covid_data[len - 4].Date.slice(0,10).replace(/-/gi, '.'),
              covid_data[len - 3].Date.slice(0,10).replace(/-/gi, '.'),
              covid_data[len - 2].Date.slice(0,10).replace(/-/gi, '.'),
              covid_data[len - 1].Date.slice(0,10).replace(/-/gi, '.')
            ],
            datasets: [{
                label: 'Death',
                data: [
                  covid_data[len - 7].Cases,
                  covid_data[len - 6].Cases,
                  covid_data[len - 5].Cases,
                  covid_data[len - 4].Cases,
                  covid_data[len - 3].Cases,
                  covid_data[len - 2].Cases,
                  covid_data[len - 1].Cases,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
      });

    })

  };
  // ngDoCheck(changes: SelectorComponent) {
  //   console.log(changes);
  // }




}


