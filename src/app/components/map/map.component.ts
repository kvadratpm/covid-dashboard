import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  mapboxgl!: Mapboxgl.Map;

  constructor() {
   }

  ngOnInit(): void {
    (Mapboxgl as typeof Mapboxgl).accessToken = environment.mapBoxKey;

    const map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
      });
  }

}
