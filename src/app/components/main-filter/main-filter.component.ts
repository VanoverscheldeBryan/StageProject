import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Location } from 'src/app/models/location';
import { Product } from 'src/app/models/product';
import { ProductOptionType } from 'src/app/models/product-option-type';
import { ProductOptionTypeItem } from 'src/app/models/product-option-type-item';
import { Timeslot } from 'src/app/models/timeslot';
import { CategoryService } from 'src/app/services/category.service';
import { FilterService } from 'src/app/services/filter.service';
import { LocationService } from 'src/app/services/location.service';
import { ProductService } from 'src/app/services/product.service';
import { TimeSlotService } from 'src/app/services/timeslot.service';
import { environment, MyEnumOptions } from 'src/environments/environment';
@Component({
  selector: 'app-main-filter',
  templateUrl: './main-filter.component.html',
  styleUrls: ['./main-filter.component.sass'],
})
export class MainFilterComponent implements OnInit {
  @Output() locationEmit = new EventEmitter<Location[]>();
  public allLocations: Location[] = [];
  public allCategories: Category[] = [];
  public allTimeslots: Timeslot[] = [];
  public allProducts: Product[] = [];
  public checkedLocations: Location[] = [];
  public checkedCategories: Category[] = [];
  public checkedTimeslots: Timeslot[] = [];
  public checkedProductOptionTypeItems: ProductOptionTypeItem[] = [];
  public tabLocation!: string;
  public tabCategory!: string;
  public tabTimeslot!: string;
  public tabTypeItem!: string;
  public myEnumOptions = MyEnumOptions;
  public type: any;
  public queryParams!: Params;
  public filters!: Params;
  public params!: Params;
  public dateSetting!: number;
  public availableProductList: Product[] = [];
  public availableLocations: Location[] = [];
  public availableCategories: Category[] = [];
  public availableTimeslots: Timeslot[] = [];

  public productOptionTypeItems: ProductOptionTypeItem[] = [];
  public productOptionTypes: ProductOptionType[] = [];
  public dynamicTabSetting: number;
  public optionType: ProductOptionType;

  constructor(
    private locationService: LocationService,
    private categoryService: CategoryService,
    private timeSlotService: TimeSlotService,
    private productService: ProductService,
    private filterService: FilterService,
    private _route: ActivatedRoute,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.dynamicTabSetting = 0;
    this.showDateTabsBySetting();
    this.showDynamicTabSetting();
    this.initLocations();
    this.initDynamicProductOptionTypeItems();
    this.initCategories();
    this.initTimeslots();
    this.initProducts();
    this.getParams();
  }
  private initDynamicProductOptionTypeItems() {
    this.filterService
      .getMainFilterProductOptionTypeItems()
      .subscribe((productOptionTypeItems: any) => {
        this.productOptionTypeItems = productOptionTypeItems;

        this.filterService.convertProductOptionTypeItemsIntoProductOptionTypes(
          productOptionTypeItems,
          this.productOptionTypes
        );
        this.checkedDynamicTabTypeItemBasedOnUrl(this.params);
        this.checkProductOptionTypeBasedOnSetting();
      });
  }
  private initProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;
    });
  }


  private initLocations() {
    this.locationService.getLocations().subscribe((locations) => {
      this.allLocations = locations;
      this.checkedLocationsBasedOnUrl(this.params);
    });
  }
  private initCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.allCategories = categories;
      this.checkedCategoriesBasedOnUrl(this.params);
    });
  }

  private initTimeslots() {
    this.timeSlotService.getAllTimeSlots().subscribe((timeslots) => {
      this.allTimeslots = timeslots;
      this.checkedTimeSlotBasedOnUrl(this.params);
      this.showTimeSlotNameAsFilter();
    });
  }

  private getParams() {
    this._route.queryParams.subscribe((params) => {
      this.params = params;
      this.availableProductList = this.productService.checkProductsAvailable(
        this.allProducts,
        this.checkedLocations,
        this.checkedCategories,
        this.checkedTimeslots,
      );
      if (this.type == 1) {
        this.availableCategories = this.productService.getAvailableCategories(this.availableProductList
        );
        // this.availableTimeslots = this.productService.showAvailableTimeslots(
        //   this.allTimeslots
        // );
      }
      if (this.type == 2) {
        this.availableLocations = this.productService.getAvailableLocations(this.availableProductList
        );
        // this.availableTimeslots = this.productService.showAvailableTimeslots(
        //   this.allTimeslots
        // );
      }
      if (this.type == 3) {
        this.availableLocations = this.productService.getAvailableLocations(this.availableProductList
          
        );
        this.availableCategories = this.productService.getAvailableCategories(this.availableProductList
         
        );
      }
    });
  }

  public updateFilter(filters: any) {
    this.showTimeSlotNameAsFilter();
    this.filters = filters;
    this.router.navigate([], {
      queryParams: this.filters,

      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }
  public submitEmittedObjects() {
    this.navigateWithQueryParams();
    this.type = undefined;
  }
  private navigateWithQueryParams() {
    this.router.navigate(['products'], {
      queryParams: this.filters,

      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  private checkedLocationsBasedOnUrl(params: Params) {
    if (params.cities != null) {
      for (let i = 0; i < this.allLocations.length; i++) {
        var location = this.allLocations[i];
        for (let city of params.cities.split(',')) {
          if (location.city == city) {
            this.checkedLocations.push(location);
          }
        }
      }
    }
  }
  private checkedCategoriesBasedOnUrl(params: Params) {
    if (params.categories != null) {
      for (let i = 0; i < this.allCategories.length; i++) {
        var cat = this.allCategories[i];
        for (let category of params.categories.split(',')) {
          if (cat.id == category) {
            this.checkedCategories.push(cat);
          }
        }
      }
    }
  }

  private checkedTimeSlotBasedOnUrl(params: Params) {
    if (params.timeslots != null) {
      for (let i = 0; i < this.allTimeslots.length; i++) {
        var ts = this.allTimeslots[i];
        for (let timeslot of params.timeslots.split(',')) {
          if (ts.id == timeslot) {
            this.checkedTimeslots.push(ts);
          }
        }
      }
    }
  }
  private checkedDynamicTabTypeItemBasedOnUrl(params: Params) {
    if (params.dynamicProductTypeItems != null) {
      for (let i = 0; i < this.productOptionTypeItems.length; i++) {
        var typeItem = this.productOptionTypeItems[i];
        for (let typeItemId of params.dynamicProductTypeItems.split(',')) {
          if (typeItem.id == typeItemId) {
            this.checkedProductOptionTypeItems.push(typeItem);
          }
        }
      }
    }
  }

  private showTimeSlotNameAsFilter() {
    if (this.dateSetting == 2) {
      if (this.checkedTimeslots.length == 1) {
        this.checkedTimeslots.forEach((timeslot) => {
          let chosenHour = timeslot.startDate.getHours() - 2;
          let chosenhour = ('0' + chosenHour).slice(-2);
          this.tabTimeslot = `${timeslot.startDate.toLocaleDateString('nl-BE', {
            timeZone: 'Europe/Brussels',
          })} ${chosenhour}:${
            (timeslot.startDate.getMinutes() < 10 ? '0' : '') +
            timeslot.startDate.getMinutes()
          }`;
        });
      }
    }
    if (this.dateSetting == 1) {
      if (this.checkedTimeslots.length == 1) {
        this.checkedTimeslots.forEach((timeslot) => {
          this.tabTimeslot = `${timeslot.startDate.toLocaleDateString(
            'en-US'
          )} - ${timeslot.endDate.toLocaleDateString('en-US')}`;
        });
      }
    }
  }
  public setEnumOption(type: MyEnumOptions) {
    if (type == this.type) {
      this.type = undefined;
    } else {
      this.type = type;
    }
  }
  private showDateTabsBySetting() {
    // setting options: 1(maand weergave(niet op punt)), 2(week weergave)
    this.dateSetting = 1;
  }
  private showDynamicTabSetting() {
    //this.dynamicTabSetting is the productOptionTypeId
    //productOptionTypeId must exist in dynamicProductOptionTypeItem for the filter to work. 
    // (current working ids 5. And 6 as a random tester to show the dynamic)
    //set this.dynamicTabSetting = 0 to disable
    this.dynamicTabSetting = 5;
  }
  private checkProductOptionTypeBasedOnSetting() {
    this.productOptionTypes.forEach((optionType) => {
      if (optionType.id == this.dynamicTabSetting) {
        this.optionType = optionType;
      }
    });
  }

}
