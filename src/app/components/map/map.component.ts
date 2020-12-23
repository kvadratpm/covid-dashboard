import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { MapboxService } from 'src/app/services/mapbox.service';
import { Country, Global, HttpRequestsService } from 'src/app/services/http-requests.service';
import { style } from '@angular/animations';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  mapboxgl!: Mapboxgl.Map;
  center!: [number, number];
  map!: Mapboxgl.Map;
  countries!: Country[];
  global!: Global;
  loading = false;

  constructor(private mapbox: MapboxService, private httpService: HttpRequestsService) {
   }

  ngOnInit(): void {
    (Mapboxgl as typeof Mapboxgl).accessToken = environment.mapBoxKey;
    this.loading = true;

    this.map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [20, 40],
      zoom: 1
    });
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.getCountries();
  }

  createMarker(lng: number, lat: number, size: number): void {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.width = `${size * 100 / 18035209}px`;
    el.style.height = `${size * 100 / 18035209}px`;
    new Mapboxgl.Marker(el)
      .setLngLat(new Mapboxgl.LngLat(lng, lat))
      .addTo(this.map);
  }

  getCountries(): void {
    const sub = this.httpService.pullRequest()
      .subscribe((response) => {
        this.countries = response.Countries;
        this.drawMap();
        sub.unsubscribe();
      });
  }

  drawMap(): void {
    this.countries.forEach((country) => {
      const inSub = this.mapbox.searchCountry(country.Country).subscribe((innerResponse) => {
        this.center = innerResponse.features[0].center;
        this.createMarker(...this.center, country.TotalConfirmed);
        inSub.unsubscribe();
        this.loading = false;
      });
    });
  }

}
