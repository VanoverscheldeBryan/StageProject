import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductOptionTypeItem } from 'src/app/models/product-option-type-item';
import { CategoryService } from 'src/app/services/category.service';
import { FilterService } from 'src/app/services/filter.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  public productList: Product[] = [];
  public cities: string[] = [];
  public categories: Category[] = [];
  public categoryIds: number[]
  public timeslots: string[] = [];
  public dynamicProductTypeItems: string[]=[]
  public SortbyParam = '';
  public SearchName = '';
  public itemName = '';
  public SortDirection = 'asc';
  public productOptionTypeItemIds: number[] = [];
  public productOptionTypeItems: ProductOptionTypeItem[] = [];
  public productOptionTypeItemList: ProductOptionTypeItem[] = [];
  public maxPrice = 0;
  public minPrice = 0;
  public isMobile: boolean = false;
  public queryParams: Params;
  constructor(
    private productService: ProductService,
    private productOptionService: FilterService,
    private _route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productOptionService
      .getSideBarFilterProductOptionTypeItems()
      .subscribe((productOptionTypeItems: any) => {
        this.productOptionTypeItemList = productOptionTypeItems;
        this.categoryService.getCategories().subscribe((categories)=> {
          this._route.queryParams.subscribe((params) => {
            this.queryParams = params;
            if ((this.productOptionTypeItemIds = [])) {
              this.productOptionTypeItems.length = 0;
            }
            this.maxPrice = +params.filterMax;
            this.minPrice = +params.filterMin;
            this.cities = params.cities ? params.cities.split(',') : [];
            this.categoryIds = params.categories
              ? params.categories.split(',')
              : [];
              categories.forEach((cat) => {
                let index = this.categoryIds.findIndex(
                  (catId) =>
                  catId == cat.id
                );
    
                if (index == -1) {
                } else {
                  this.categories.push(cat);
                }
              });
            this.timeslots = params.timeslots ? params.timeslots.split(',') : [];
            this.productOptionTypeItemIds = params.productTypeItems
              ? params.productTypeItems.split(',')
              : [];
            this.productOptionTypeItemList.forEach((productOptionTypeItem) => {
              let index = this.productOptionTypeItemIds.findIndex(
                (productOptionTypeItemId) =>
                  productOptionTypeItemId == productOptionTypeItem.id
              );
  
              if (index == -1) {
              } else {
                this.productOptionTypeItems.push(productOptionTypeItem);
              }
            });
            this.dynamicProductTypeItems = params.dynamicProductTypeItems ? params.dynamicProductTypeItems.split(',') : [];
  
            this.productService.getProducts().subscribe((val) => {
              this.productList = val;
              this.productList = this.productService.getProductsByFilters(
                this.productList,
                this.cities,
                this.categories,
                this.timeslots,
                this.dynamicProductTypeItems
              );
              this.productList = this.productService.filterProductsByPrice(
                this.productList,
                this.maxPrice,
                this.minPrice
              );
              this.productList = this.productService.filterProductsByType(
                this.productList,
                this.productOptionTypeItems
              );
            });
          });
        })
 
      });
  }
  public onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
  public backToMainFilter() {
    this.router.navigate(['home'], { queryParams: this.queryParams });
  }

}
