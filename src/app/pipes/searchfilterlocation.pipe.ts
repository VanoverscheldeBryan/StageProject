import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilterlocation'
})
export class SearchfilterlocationPipe implements PipeTransform {
  transform(items: any, term: any, prop: any): any {
    if (term) {
      return items.filter(function (item) {
        return item.city.toLowerCase().includes(term.toLowerCase());
      });
    }
    return items;
  }
}
