import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http: HttpClient) { }

  search_word(query: string): any {
    const url = '';
    this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?types=country&access_token=${environment.mapBoxKey}`)
      .subscribe(response => console.log(response));
  }
}
