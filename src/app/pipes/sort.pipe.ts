import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../services/http-requests.service';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: Country[]): Country[] {
    return arr.sort((country1, country2) => country1.TotalConfirmed > country2.TotalConfirmed ? -1 : 1);
  }

}
