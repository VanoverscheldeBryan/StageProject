import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductOptionItem } from '../models/product-option-item';
import { ProductOptionType } from '../models/product-option-type';
import { ProductOptionTypeItem } from '../models/product-option-type-item';
import { environment } from 'src/environments/environment';
import { ExceptionHandlerService } from './exception-handler-service.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient, private exceptionHandlerService: ExceptionHandlerService) {}

  public getSideBarFilterProductOptionTypeItems(): Observable<
    ProductOptionTypeItem[]
  > {
    return this.http
      .get<ProductOptionTypeItem[]>(
        environment.api_url + '/productOptionTypeItem'
      )
      .pipe(
        catchError(this.exceptionHandlerService.handleError),
        map((list: any[]): ProductOptionTypeItem[] =>
          list.map(ProductOptionTypeItem.fromJSON)
        )
      );
  }

  public getMainFilterProductOptionTypeItems(): Observable<
    ProductOptionTypeItem[]
  > {
    return this.http
      .get<ProductOptionTypeItem[]>(
        environment.api_url + '/dynamicProductOptionTypeItem'
      )
      .pipe(
        catchError(this.exceptionHandlerService.handleError),
        map((list: any[]): ProductOptionTypeItem[] =>
          list.map(ProductOptionTypeItem.fromJSON)
        )
      );
  }

  public convertProductOptionTypeItemsIntoProductOptionTypes(
    productOptionTypeItems: ProductOptionTypeItem[],
    productOptionTypes: ProductOptionType[]
  ) {
    productOptionTypeItems.forEach((productOptionTypeItem) => {
      let index = productOptionTypes.findIndex(
        (productOptionType) =>
          productOptionType.id == productOptionTypeItem.productOptionTypeId
      );
      if (index == -1) {
        //zit hij er nog niet in voeg ik hem toe
        var productOptionType = new ProductOptionType(
          productOptionTypeItem.productOptionTypeId,
          productOptionTypeItem.productOptionTypeDescription
        );
        productOptionType.productOptionTypeItems.push(productOptionTypeItem);
        productOptionTypes.push(productOptionType);
      } else {
        productOptionTypes[index].productOptionTypeItems.push(
          productOptionTypeItem
        );
      }
    });
  }

}
