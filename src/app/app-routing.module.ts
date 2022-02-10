import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainFilterComponent } from './components/main-filter/main-filter.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ProductListItemDetailComponent } from './components/product-list-item-detail/product-list-item-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: MainViewComponent,
    data: {
      title: 'products',
      breadcrumb: [
        {
          label: 'products', // pageTwoID Parameter value will be add
          url: '',
        },
      ],
    },
  },
  {
    path: 'products/:id',
    component: ProductListItemDetailComponent,
    data: {
      title: 'products',
      breadcrumb: [
        {
          label: 'products',
          url: '/products',
        },
        {
          label: '{{id}}',
          url: '',
        },
      ],
    },
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
