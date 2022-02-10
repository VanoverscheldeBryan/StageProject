import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.sass'],
})
export class ProductListItemComponent implements OnInit {
  @Input() productItem!: Product;
  public category: Category;
  public products: Product[] = [];
  public productOptionItem!: String;
  public categoryName!: String;

  constructor(
    private cartService: CartService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategoryById(this.productItem.categoryId)
      .subscribe((category) => {
        this.category = category;
      });
  }

  public handleAddToCart() {
    this.cartService.addToCart(this.productItem);
  }


}
