import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../services/http-requests.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: Country[], field: string = ''): Country[] {
    if (!field.trim()) {
      return arr;
    }
    return arr.filter((country) => country.Country.toLowerCase().includes(field.toLowerCase()));
  }

}
