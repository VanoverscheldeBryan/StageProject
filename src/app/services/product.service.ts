import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { result } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/category';
import { Location } from '../models/location';
import { Product } from '../models/product';
import { ProductOptionItem } from '../models/product-option-item';
import { ProductOptionTypeItem } from '../models/product-option-type-item';
import { Timeslot } from '../models/timeslot';
import { environment } from 'src/environments/environment';
import { ExceptionHandlerService } from './exception-handler-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private exceptionHandlerService: ExceptionHandlerService
  ) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api_url + '/products').pipe(
      catchError(this.exceptionHandlerService.handleError),
      map((list: any[]): Product[] => list.map(Product.fromJSON))
    );
  }

  public getProductById(idInt: string): Observable<Product> {
    const url = environment.api_url + `/products/${idInt}`;
    return this.http.get<Product>(url);
  }

  public getProductsWithSameCategory(products: Product[], product: Product) {
    let productWithSameCategoryList = [];
    products.forEach((prod) => {
      if (prod.categoryId == product.categoryId) {
        productWithSameCategoryList.push(prod);
      }
      if (prod.id == product.id) {
        let index = productWithSameCategoryList.findIndex(
          (product) => product.id == prod.id
        );
        productWithSameCategoryList.splice(index, 1);
      }
    });
    return productWithSameCategoryList;
  }
  public getProductsByFilters(
    products: Product[],
    cities: string[] = [],
    categories: Category[] = [],
    timeslots: string[] = [],
    dynamicProductTypeItems: string[] = []
  ): Product[] {
    var results = products;
    if (cities.length != 0) {
      results = results.filter((product) => {
        for (let city of cities) {
          if (product.location.city == city) {
            return product.location.city;
          }
        }
        return null;
      });
    }

    if (categories.length != 0) {
      results = results.filter((product) => {
        for (let category of categories) {
          if (product.categoryId == category.id) {
            return product.categoryId;
          }
        }
        return null;
      });
    }
    if (timeslots.length != 0) {
      results = results.filter((product) => {
        for (let timeslotId of timeslots) {
          let indexProductTimeslot = product.timeslots.findIndex(
            (timeslot) => timeslot.toString() == timeslotId
          );
          if (indexProductTimeslot != -1) {
            return product;
          }
        }
        return null;
      });
    }
    if (dynamicProductTypeItems.length != 0) {
      results = results.filter((product) => {
        for (let typeItem of dynamicProductTypeItems) {
          let indexdynamicProductTypeItems =
            product.productOptionItems.findIndex(
              (optionTypeItem) =>
                optionTypeItem.productOptionTypeItemId.toString() == typeItem
            );
          if (indexdynamicProductTypeItems != -1) {
            return product;
          }
        }
        return null;
      });
    }
    return results;
  }
  public filterProductsByPrice(
    products: Product[],
    maxPrice: number,
    minPrice: number
  ): Product[] {
    var results = products;
    if (Number.isInteger(minPrice)) {
      results = results.filter((product) => product.price >= minPrice);
    }
    if (Number.isInteger(maxPrice)) {
      results = results.filter((product) => product.price <= maxPrice);
    }

    return results;
  }

  public filterProductsByType(
    products: Product[],
    productOptionTypeItems: ProductOptionTypeItem[] = []
  ): Product[] {
    // console.log(products);
    var results = products;
    if (productOptionTypeItems.length != 0) {
      results = results.filter((product) => {
        for (let productOptionTypeItem of productOptionTypeItems) {
          if (
            product.productOptionItems[0].productOptionTypeItemId ==
            productOptionTypeItem.id
          ) {
            return product.productOptionItems[0].productOptionTypeItemId;
          }
        }
        return null;
      });
    }
    return results;
  }

  public checkProductsAvailable(
    allProducts: Product[],
    checkedLocations: Location[],
    checkedCategories: Category[],
    checkedTimeslots: Timeslot[]
  ) {
    let availableProductList = [];

    if (
      checkedLocations.length != 0 ||
      checkedCategories.length != 0 ||
      checkedTimeslots.length != 0
    ) {
      allProducts.forEach((product) => {
        let indexLocation = checkedLocations.findIndex(
          (location) => location.id == product.location.id
        );
        if (indexLocation != -1) {
          availableProductList.push(product);
        }
        let indexCategory = checkedCategories.findIndex(
          (category) => category.id == product.categoryId
        );
        if (indexCategory != -1) {
          availableProductList.push(product);
        }
        // let indexTimeslot = checkedTimeslots.findIndex(
        //   (timeslot) => timeslot.id == product.timeslots
        // );
        // if (indexTimeslot != -1) {
        //   this.availableProductList.push(product);
        // }
      });
    } else {
      availableProductList = allProducts;
    }
    return availableProductList;
  }

  public getAvailableLocations(availableProductList : Product[]) {
    let availableLocations = [];
    availableProductList.forEach((availableProduct) => {
      availableLocations.push(availableProduct.location);
    });
    return availableLocations;
  }
  public getAvailableCategories(availableProductList : Product[]) {
    let availableCategories = [];
    availableProductList.forEach((availableProduct) => {
      availableCategories.push(availableProduct.categoryId);
    });
    return availableCategories;
  }
}
