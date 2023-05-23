import { Component } from '@angular/core';
import { ProdukService } from 'src/app/service/produk.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public products: any = [];
  public total !: number;

  constructor(private service: ProdukService) { }

  ngOnInit() {
    this.getCart()
  }

  getCart() {
    this.service.getCart()
    .subscribe(response => {
      this.products = response
      this.total = this.service.getTotalPrice();
    })
  }

  remove(item: any) {
    this.service.deleteCartItem(item);
  }
}
