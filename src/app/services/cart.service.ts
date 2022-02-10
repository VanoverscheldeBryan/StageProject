import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { share } from 'rxjs/operators';

let itemsInCart = [];
let cart = [];
//console.log("itemsInCart: ", itemsInCart);
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private storageSub = new Subject<string>();
  // public storageSubObs!: Observable<any>;
  public cart: any;
  public subject = new Subject<any>();
  public product!: Product;
  public cartItem!: CartItem | null;

  constructor() {}

  ngOnInit(): void {}

  public addToCart(product: Product): void {
    let local_storage;
    let itemsInCart = [];
    this.cartItem = {
      product: product,
      price: product.price,
      qty: 1,
    };
    if (localStorage.getItem('cart') == null) {
      let local_storage = [];
      // console.log(
      //   'LOCALSTORAGE NULL',
      //   JSON.parse(localStorage.getItem('cart') || '{}')
      // );
      itemsInCart.push(this.cartItem);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      // console.log('Pushed first Item: ', itemsInCart);
    } else {
      let local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
      // console.log(
      //   'LOCAL STORAGE HAS ITEMS',
      //   JSON.parse(localStorage.getItem('cart') || '{}')
      // );
      for (var i in local_storage) {
        // console.log(local_storage[i].productId);
        if (this.cartItem.product.id == local_storage[i].productId) {
          local_storage[i].qty += 1;
          // console.log('Quantity for ' + i + ' : ' + local_storage[i].qty);
          // console.log('same product! index is ', i);
          this.cartItem = null;
          break;
        }
      }
      if (this.cartItem) {
        itemsInCart.push(this.cartItem);
      }
      local_storage.forEach(function (item: any) {
        itemsInCart.push(item);
      });
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
    }
  }
  public getItems() {
    // console.log('Cart: ', JSON.parse(localStorage.getItem('cart') || '{}'));
    return (this.cartItem = JSON.parse(localStorage.getItem('cart') || '{}'));

    //return this.items =
  }
  public deleteItem(item: CartItem) {
    item = item;
    console.log('Deleting : ', item);
    let shopping_cart;
    let index;
    shopping_cart = JSON.parse(localStorage.getItem('cart') || '{}');
    for (let i in shopping_cart) {
      if (item?.product.name == shopping_cart[i].productName) {
        index = i;
        console.log(index);
      }
    }
    shopping_cart.splice(index, 1);
    console.log('shopping_cart ', shopping_cart);
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    this.subject.next(this.cart);

    // console.log(this.currentUserSubject)
    // this.cart.next(item);
    return null;
  }
  public addQty(item: CartItem | null) {
    let shopping_cart;
    shopping_cart = JSON.parse(localStorage.getItem('cart') || '{}');
    for (let i in shopping_cart) {
      if (item === null) return;
      if (item.product.name == shopping_cart[i].product.name) {
        shopping_cart[i].quantity += 1;
        item = null;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    // this.storageSub.next('changed');
  }
  public numberOfItems() {
    let itemsInCart = JSON.parse(localStorage.getItem('cart') || '{}');
    return itemsInCart.length;
  }
  public clearCart() {
    localStorage.clear();
  }
}
