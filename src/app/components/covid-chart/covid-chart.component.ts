import { Component, OnInit } from '@angular/core';
import { Chart, ChartColor } from 'chart.js';

import {Summary,HttpRequestsService, Global, Country} from "../../services/http-requests.service";

@Component({
  selector: 'app-covid-chart',
  templateUrl: './covid-chart.component.html',
  styleUrls: ['./covid-chart.component.scss']
})

export class CovidChartComponent implements OnInit {

  global:Global | undefined;
  countries:Country[] | undefined;
  public chart_type: string = 'Deaths'
  private types = ['Confirmed', 'Deaths', 'Recovered'];
  private i:number = 1;

  constructor(private httpService:HttpRequestsService) {}



  go(n: number){
    this.i = this.i + n;
    if (this.i > 2){
      this.i = 3 - this.i;

    } else if(this.i < 0){
      this.i = 1 - this.i;
    }
    this.chart_type = this.types[this.i]
    this.draw();

  }
  ngOnInit() {
    console.log("SS")
    this.chart_type = 'Deaths';
    this.draw();
  };
  
  draw(){
    const type = this.chart_type;
    let color:ChartColor;
    if (type === 'Confirmed'){
      color = 'rgba(255, 99, 132, 1)';
    } else if (type === 'Recovered'){
      color = '#31E981'
    }
    const url = 'https://api.covid19api.com/country/russia/status/'
    this.httpService.GET<Summary>(url + type.toLowerCase()).subscribe(summary=>{
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
                label: type,
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

  }

}


