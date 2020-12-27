import { Component, OnInit } from '@angular/core';
import { Country } from './services/http-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-dashboard';
}
