import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  public cartTotal = 0;
  public cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    
    this.getItems();
    this.calcCartTotal();

  }

  private getItems() {
    this.cartItems = this.cartService.getItems();
    console.log(this.cartItems)
    
  }

  public deleteItem(item: any) {
    this.cartService.deleteItem(item);
  }
  public addQty(item: any) {
    this.cartService.addQty(item);
  }
  private calcCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach((item) => {
      this.cartTotal += item.qty * item.price;
    });
  }
}
