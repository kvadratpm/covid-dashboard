import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


export interface FeatureCollection {
  query: [];
  features: Array<{center: [number, number]}>;
  attribution: string;
}
@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http: HttpClient) { }

  searchCountry(country: string): Observable<FeatureCollection> {
    return this.http
    .get<FeatureCollection>
    (`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?types=country&access_token=${environment.mapBoxKey}`);
  }

  getBoundaries(): Observable<FeatureCollection> {
    return this.http
      .get<FeatureCollection>('https://raw.githubusercontent.com/mapbox/geojson-vt-cpp/master/data/countries.geojson');
  }
}
