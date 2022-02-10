import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocationFilterComponent } from './components/location-filter/location-filter.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MainFilterComponent } from './components/main-filter/main-filter.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SideFiltersComponent } from './components/side-filters/side-filters.component';
import { CartComponent } from './components/cart/cart.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { SortfilterPipe } from './pipes/sortfilter.pipe';
import { SearchfilterPipe } from './pipes/searchfilter.pipe';
import { ProductListItemDetailComponent } from './components/product-list-item-detail/product-list-item-detail.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ProductOptionItemFilterComponent } from './components/product-option-item-filter/product-option-item-filter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxSpinnerModule } from 'ngx-spinner';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './http-interceptors/interceptor.service';

import { MonthDateFilterComponent } from './components/month-date-filter/month-date-filter.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './components/home/home.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import {ScrollingModule} from '@angular/cdk/scrolling';
import { SearchfilterlocationPipe } from './pipes/searchfilterlocation.pipe';
import {BreadcrumbModule} from 'angular-crumbs';
import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";
import { DynamicTabFilterComponent } from './components/dynamic-tab-filter/dynamic-tab-filter.component';
import { ProductOptionTypeItemsComponent } from './components/product-option-type-items/product-option-type-items.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LocationFilterComponent,
    MainFilterComponent,
    CategoryFilterComponent,
    ProductListItemComponent,
    ProductListComponent,
    MainViewComponent,
    DateFilterComponent,
    SideFiltersComponent,
    CartComponent,
    PriceFilterComponent,
    SortfilterPipe,
    SearchfilterPipe,
    ProductListItemDetailComponent,
    CartItemComponent,
    ProductOptionItemFilterComponent,
    NavBarComponent,
    MonthDateFilterComponent,
    HomeComponent,
    SearchfilterlocationPipe,
    DynamicTabFilterComponent,
    ProductOptionTypeItemsComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxBootstrapMultiselectModule,
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgMultiSelectDropDownModule.forRoot(),
    SlickCarouselModule,
    NgxSliderModule,
    NgImageSliderModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DateRangePickerModule,
    NgxDaterangepickerMd.forRoot({}),
    MatToolbarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ScrollingModule,
    BreadcrumbModule,
    NgDynamicBreadcrumbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    MatDatepickerModule  

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
