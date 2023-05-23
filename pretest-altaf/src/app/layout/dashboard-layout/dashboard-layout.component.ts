import { Component } from '@angular/core';
import { ProdukService } from 'src/app/service/produk.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  public totalCart: number = 0;
  public cart: any = [];

  constructor(private service: ProdukService) {}

  ngOnInit() {
    this.getCart()
  }

  getCart() {
    this.service.getCart()
    .subscribe(response => {
      this.totalCart = response.length;
      this.cart = response;
      console.log(this.cart)
    })
  }

  remove(item: any) {
    this.service.deleteCartItem(item);
  }
}
