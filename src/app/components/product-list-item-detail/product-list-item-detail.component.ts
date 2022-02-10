import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { TimeSlotService } from 'src/app/services/timeslot.service';
import { Timeslot } from 'src/app/models/timeslot';
import { ifStmt, THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product-list-item-detail',
  templateUrl: './product-list-item-detail.component.html',
  styleUrls: ['./product-list-item-detail.component.sass'],
})
export class ProductListItemDetailComponent implements OnInit {
  public product!: Product;
  public products: Product[] = [];
  public category: Category
  public categoryName!: String;
  public productOptionItem!: String;
  public productWithSameCategoryList: Product[] = [];
  public id: any;
  public allTimeslots: Timeslot[] = [];
  public timeslotFullDate: Timeslot
  constructor(
    private _route: Router,
    private router: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private timeslotService: TimeSlotService
  ) {}

  ngOnInit(): void {

      this.initProductsById();
      this.initTimeslots();

  }
  private initCategories(){
    this.categoryService
    .getCategoryById(this.product.categoryId)
    .subscribe((category) => {
      this.category = category;
    });
  }
  private initTimeslots() {
    this.timeslotService.getAllTimeSlots().subscribe((timeslots) => {
      this.allTimeslots = timeslots;
    });
 

  }
  private initProductsById() {
    this.router.paramMap.subscribe((params) => {
      let idString = params.get('id');
      this.id = idString;
    });
    this.productService.getProductById(this.id).subscribe((product) => {
      this.product = product;
      this.getProductOptionItems();
      this.initCategories();
      this.initRelatableProducts();

    });

  }

  private initRelatableProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.productWithSameCategoryList = this.productService.getProductsWithSameCategory(products, this.product);
    });
  }



  private getProductOptionItems() {
    for (let i in this.product.productOptionItems) {
      {
        this.productOptionItem = this.product.productOptionItems[i].description;
      }
    }
  }

  public handleAddToCart() {
    this.cartService.addToCart(this.product);
  }
  // public backToProductList() {
  //   this._route.navigate(['products']);
  // }

}
