
import { Product } from "./product";

export class CartItem {
  product: Product
  qty: number;
  price: number;

  constructor(product: Product, qty = 1) {
    this.product = product
    this.price = product.price;
    this.qty = qty;
  }
}