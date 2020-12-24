import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Global, Country, HttpRequestsService } from 'src/app/services/http-requests.service';
import { AppStateService } from 'src/app/services/app-state.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],

})
export class TableComponent implements OnInit {
  table_type: string = 'Total';
  private i = 1;
  currentField!: string;
  form!: FormGroup;
  global!: Global;
  countries!: Country[];
  loading = false;
  private types = ['100 thousand', 'Total', 'New'];

  constructor(public httpService: HttpRequestsService, public appState: AppStateService) { }

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
  go(n: number): void{
    console.log(this.i);
    let el;
    if(this.i == 0){
      el = document.getElementById('days')

    } else {
      el = document.getElementById(this.types[this.i])
    }


    el!.style.display = 'none';

    this.i = this.i + n;
    if (this.i > 2){
      this.i = 3 - this.i;
    } else if (this.i < 0){
      this.i = 1 - this.i;
    }

    this.table_type = this.types[this.i]

    if(this.i == 0){
      el = document.getElementById('days')

    } else {
      el = document.getElementById(this.types[this.i])
    }


    el!.style.display = 'flex';

  }

}
