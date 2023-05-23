import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdukService {

  constructor() { }

  private apiUrl = 'https://fakestoreapi.com';

  // produk
  getProducts() {
    return axios.get(`${this.apiUrl}/products`);
  }

  // cart
  public cart: any = []
  public products = new BehaviorSubject<any>([])

  getCart() {
    return this.products.asObservable();
  }

  setCart(product: any) {
    this.cart.push(...product);
    this.products.next(product)
  }

  addToCart(product: any) {
    this.cart.push(product);
    this.products.next(this.cart);
    this.getTotalPrice();
  }

  getTotalPrice() : number {
    let grandTotal = 0;
    this.cart.map((a: any) => {
      grandTotal += a.total
    })
    return grandTotal
  }

  deleteCartItem(product: any) {
    this.cart.map((a: any, index: any) => {
      if(product.id === a.id) {
        this.cart.splice(index, 1)
      }
    })
    this.products.next(this.cart)
  }

  deleteAllCart() {
    this.cart = []
    this.products.next(this.cart)
  }

}
