import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SummaryTableComponent } from './components/summary-table/summary-table.component';
import { MapComponent } from './components/map/map.component';
import { SortPipe } from './pipes/sort.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { CovidChartComponent } from './components/covid-chart/covid-chart.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryTableComponent,
    MapComponent,
    SortPipe,
    FilterPipe,
    CovidChartComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
