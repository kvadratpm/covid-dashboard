import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { FeatureCollection, MapboxService } from 'src/app/services/mapbox.service';
import { Country, Global, HttpRequestsService } from 'src/app/services/http-requests.service';
import { style } from '@angular/animations';
import { AppStateService } from 'src/app/services/app-state.service';
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
  max!: number;
  hoveredStateId!: any;
  boundaries!: FeatureCollection;

  constructor(private mapbox: MapboxService, private httpService: HttpRequestsService, private appState: AppStateService) {
   }

  ngOnInit(): void {
    (Mapboxgl as typeof Mapboxgl).accessToken = environment.mapBoxKey;
    this.loading = true;
    this.hoveredStateId = null;

    this.mapbox.getBoundaries().subscribe((response) => this.boundaries = response);

    this.map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [20, 40],
      zoom: 1
    });
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.getCountries();
  }

  createMarker(lng: number, lat: number, size: number, country: string, countryCode: string, currentStat: number): void {
    const el = document.createElement('div');
    el.className = 'marker';
    const markerSize = size * 100 / this.max < 10 ? 10 : size * 100 / this.max;
    el.style.width = `${markerSize}px`;
    el.style.height = `${markerSize}px`;
    el.id = country;
    el.addEventListener('click', () => this.setCurrentCountry(el.id));
    const marker: Mapboxgl.Marker = new Mapboxgl.Marker(el)
      .setLngLat(new Mapboxgl.LngLat(lng, lat));
    marker.setPopup(new Mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(`<h3>${country}
        <img src="https://www.countryflags.io/${countryCode}/flat/16.png">
      </h3>
      <p>Total confirmed: ${currentStat}</p>`))
      .addTo(this.map);
  }

  getCountries(): void {
    const sub = this.httpService.pullRequest()
      .subscribe((response) => {
        this.countries = response.Countries;
        this.max = this.countries
          .sort((country1, country2) => country1.TotalConfirmed > country2.TotalConfirmed ? -1 : 1)[0].TotalConfirmed;
        this.drawMap();
        sub.unsubscribe();
    });
  }

  drawMap(): void {
    this.countries.forEach((country) => {
      const inSub = this.mapbox.searchCountry(country.Country).subscribe((innerResponse) => {
        this.center = innerResponse.features[0].center;
        this.createMarker(...this.center, country.TotalConfirmed, country.Country, country.CountryCode, country.TotalConfirmed);
        inSub.unsubscribe();
        this.loading = false;
      });
    });
  }

  setCurrentCountry(country: string): void {
    this.appState.currentCountry = country;
    this.countries.forEach((elem) => {
      if (elem.Country === this.appState.currentCountry) {
        this.appState.currentCountryObj = elem;
        return;
      }
    });
  }

}
