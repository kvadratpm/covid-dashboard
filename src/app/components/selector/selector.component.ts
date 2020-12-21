import { NgLocaleLocalization } from '@angular/common';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent{
  public chart_type: string = 'Death'
  private types = ['Confirmed', 'Death', 'Recovered'];
  private i:number = 1;

  constructor() { }
  go(n: number){
    this.i = this.i + n;
    if (this.i > 2){
      this.i = 3 - this.i;

    } else if(this.i < 0){
      this.i = 1 - this.i;
    }
    this.chart_type = this.types[this.i]
  }
}
