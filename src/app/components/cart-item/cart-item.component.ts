import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: CartItem;

  public changed: any;
  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.subject.subscribe((items) => (this.changed = items));
    this.cartService.getItems();
  }
  public handleDeleteFromCart() {
    this.cartService.deleteItem(this.cartItem);
  }
}
