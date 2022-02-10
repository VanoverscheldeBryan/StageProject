import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductOptionTypeItem } from 'src/app/models/product-option-type-item';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-product-option-type-items',
  templateUrl: './product-option-type-items.component.html',
  styleUrls: ['./product-option-type-items.component.sass'],
})
export class ProductOptionTypeItemsComponent implements OnInit {
  @Input() optionTypeItem: ProductOptionTypeItem;
  public checkedProductOptionTypeItems: ProductOptionTypeItem[] = [];
  // @Output() checkedProductOptionTypeItems: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private productOptionItemService: FilterService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  public checkedProductOptionTypeItem(
    productOptionTypeItem: ProductOptionTypeItem,
    e: any
  ) {
    if (e.target.checked) {
      this.checkedProductOptionTypeItems.push(productOptionTypeItem);
    } else {
      let index = this.checkedProductOptionTypeItems.findIndex(
        (productTypeItem) => productTypeItem.id == productOptionTypeItem.id
      );
      this.checkedProductOptionTypeItems.splice(index, 1);
    }
    console.log(this.checkedProductOptionTypeItems);
    this.updateQueryParams();
  }

  public isChecked(id: any): boolean {
    let index = this.checkedProductOptionTypeItems.findIndex(
      (typeItem) => typeItem.id == id
    );
    return index != -1;
  }
  private updateQueryParams() {
    this.router.navigate(['products'], {
      queryParams: {
        productTypeItems: this.checkedProductOptionTypeItems.length
          ? this.checkedProductOptionTypeItems
              .map((productTypeItem) => productTypeItem.id)
              .join(',')
          : null,
      },
      queryParamsHandling: 'merge',
    });
  }
  // private readCheckedOptionTypeItemsFromUrl() {
  //   this._route.queryParams.subscribe((params) => {
  //     if (params.productTypeItems != null) {
  //       this.checkedProductOptionTypeItems.length = 0;
  //       for (let i = 0; i < this.productOptionTypeItems.length; i++) {
  //         var optionTypeItem = this.productOptionTypeItems[i];
  //         for (let optionTypeItemId of params.productTypeItems.split(',')) {
  //           if (optionTypeItem.id == optionTypeItemId) {
  //             this.checkedProductOptionTypeItems.push(optionTypeItem);
  //           }
  //         }
  //       }
  //     }
  //   });
  // }
}
