import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Global, Country, HttpRequestsService } from 'src/app/services/http-requests.service';


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
  private types = ['100 days', 'Total', 'New'];

  constructor(public httpService: HttpRequestsService) { }

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
    
    this.i = this.i + n;
    if (this.i > 2){
      this.i = 3 - this.i;
    } else if (this.i < 0){
      this.i = 1 - this.i;
    }
    if(this.i == 2)
    this.table_type = this.types[this.i]

  }

}
