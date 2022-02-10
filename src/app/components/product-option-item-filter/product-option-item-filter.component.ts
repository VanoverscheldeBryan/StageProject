import { Component, OnInit } from '@angular/core';
import { ProductOptionItem } from 'src/app/models/product-option-item';
import { ProductOptionType } from 'src/app/models/product-option-type';
import { ProductOptionTypeItem } from 'src/app/models/product-option-type-item';
import { FilterService } from 'src/app/services/filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAnimation } from 'src/app/app.component';


@Component({
  selector: 'app-product-option-item-filter',
  templateUrl: './product-option-item-filter.component.html',
  styleUrls: ['./product-option-item-filter.component.sass'],
  animations:[fadeAnimation]
})
export class ProductOptionItemFilterComponent implements OnInit {
  constructor(
    private productOptionItemService: FilterService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}
  public productOptionTypeItems: ProductOptionTypeItem[] = [];
  public productOptionTypes: ProductOptionType[] = [];
  public checkedProductOptionTypeItems: ProductOptionTypeItem[] = [];
  public showOptionTypeItem!: boolean;
  public filters: any

  ngOnInit(): void {
    this.showOptionTypeItem = true
    this.productOptionItemService
      .getSideBarFilterProductOptionTypeItems()
      .subscribe((productOptionTypeItems: any) => {
        this.productOptionTypeItems = productOptionTypeItems;
        this.productOptionItemService.convertProductOptionTypeItemsIntoProductOptionTypes(productOptionTypeItems, this.productOptionTypes);
        this.readCheckedOptionTypeItemsFromUrl();
      });
  }

  // private updateQueryParams() {
  //   this.router.navigate(['products'], {
  //     queryParams: {
  //       productTypeItems: this.checkedProductOptionTypeItems.length
  //         ? this.checkedProductOptionTypeItems
  //             .map((productTypeItem) => productTypeItem.id)
  //             .join(',')
  //         : null,
  //     },
  //     queryParamsHandling: 'merge',
  //   });
  // }

  private readCheckedOptionTypeItemsFromUrl() {
    this._route.queryParams.subscribe((params) => {
      if (params.productTypeItems != null) {
        this.checkedProductOptionTypeItems.length = 0;
        for (let i = 0; i < this.productOptionTypeItems.length; i++) {
          var optionTypeItem = this.productOptionTypeItems[i];
          for (let optionTypeItemId of params.productTypeItems.split(',')) {
            if (optionTypeItem.id == optionTypeItemId) {
              this.checkedProductOptionTypeItems.push(optionTypeItem);
            }
          }
        }
      }
    });
  }
  public clickOptionType(e: any) {
    this.showOptionTypeItem != this.showOptionTypeItem
    // if (e == this.showOptionTypeItem) {
    //   // this.showOptionTypeItem = 0;
    // } else {
    //   // this.showOptionTypeItem = e;
    // }
  }
}
