import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { MapboxService } from 'src/app/services/mapbox.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  mapboxgl!: Mapboxgl.Map;

  constructor(private mapbox: MapboxService) {
   }

  ngOnInit(): void {
    (Mapboxgl as typeof Mapboxgl).accessToken = environment.mapBoxKey;

    const map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [20, 40],
      zoom: 1
    });
    map.addControl(new Mapboxgl.NavigationControl());
    console.log(this.mapbox.search_word('Russia'));
  }

}
