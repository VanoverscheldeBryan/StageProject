import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter',
})
export class SearchfilterPipe implements PipeTransform {
  transform(items: any, term: any, prop: any): any {
    if (term) {
      return items.filter(function (item) {
        return item[prop].toLowerCase().includes(term.toLowerCase());
      });
    }
    return items;
  }
}
