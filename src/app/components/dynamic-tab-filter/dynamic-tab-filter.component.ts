import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductOptionType } from 'src/app/models/product-option-type';
import { ProductOptionTypeItem } from 'src/app/models/product-option-type-item';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-dynamic-tab-filter',
  templateUrl: './dynamic-tab-filter.component.html',
  styleUrls: ['./dynamic-tab-filter.component.sass'],
})
export class DynamicTabFilterComponent implements OnInit {
  @Input() optionType: ProductOptionType;
  @Input() productOptionTypeItems: ProductOptionTypeItem[] = [];
  @Input() checkedProductOptionTypeItems: ProductOptionTypeItem[] = [];
  @Output() productOptionTypesFilter: EventEmitter<any> =
    new EventEmitter<any>();

  public term!: string;

  constructor(private router: Router, private _route: ActivatedRoute) {}

  public productOptionTypes: ProductOptionType[] = [];
  public showOptionTypeItem!: number;
  ngOnInit(): void {
    this.getDynamicTabProductOptionTypeItems();
    this.readCheckedOptionTypeItemsFromUrl();
  }

  private getDynamicTabProductOptionTypeItems() {
    this.productOptionTypeItems.forEach((productOptionTypeItem) => {
      let index = this.productOptionTypes.findIndex(
        (productOptionType) =>
          productOptionType.id == productOptionTypeItem.productOptionTypeId
      );
      if (index != -1) {
        this.optionType.productOptionTypeItems.push(productOptionTypeItem);
      }
    });
  }
  public checkedProductOptionTypeItem(
    productOptionTypeItem: ProductOptionTypeItem,
    e: any
  ) {
    if (e.target.checked) {
      this.checkedProductOptionTypeItems.push(productOptionTypeItem);
    } else {
      let index = this.checkedProductOptionTypeItems.findIndex(
        (checkedProductOptionTypeItem) =>
          checkedProductOptionTypeItem.id == productOptionTypeItem.id
      );
      this.checkedProductOptionTypeItems.splice(index, 1);
    }
    let checkedDynamicProductTypeItemsUrlObject = this
      .checkedProductOptionTypeItems.length
      ? {
          dynamicProductTypeItems: this.checkedProductOptionTypeItems
            .map(
              (checkedProductOptionTypeItem) => checkedProductOptionTypeItem.id
            )
            .join(','),
        }
      : { dynamicProductTypeItems: null };
    this.productOptionTypesFilter.emit(checkedDynamicProductTypeItemsUrlObject);
  }

  public isChecked(id: any): boolean {
    let index = this.checkedProductOptionTypeItems.findIndex(
      (checkedProductOptionTypeItem) => checkedProductOptionTypeItem.id == id
    );
    return index != -1;
  }

  private readCheckedOptionTypeItemsFromUrl() {
    this._route.queryParams.subscribe((params) => {
      if (params.dynamicProductTypeItems != null) {
        this.checkedProductOptionTypeItems.length = 0;
        for (let i = 0; i < this.productOptionTypeItems.length; i++) {
          var optionTypeItem = this.productOptionTypeItems[i];
          for (let optionTypeItemId of params.dynamicProductTypeItems.split(
            ','
          )) {
            if (optionTypeItem.id == optionTypeItemId) {
              this.checkedProductOptionTypeItems.push(optionTypeItem);
            }
          }
        }
      }
    });
  }
}
