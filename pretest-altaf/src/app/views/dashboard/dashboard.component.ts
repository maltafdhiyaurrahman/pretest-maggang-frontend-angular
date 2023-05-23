import { Component } from '@angular/core';
import { ProdukService } from 'src/app/service/produk.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products: any[] = []
  search: string = ''
  filteredProducts: any[] = []

  constructor(private service: ProdukService) {}

  ngOnInit() {
    this.getProducts()
  }

  // applyFilter() {
  //   this.filteredProducts = this.products.filter(item => {
  //     return item.title.toLowerCase().includes(this.search.toLowerCase());
  //   });
  // }

  filter() : any[] {
    if (!this.search) {
      return this.products;
    } else {
      return this.products.filter((item) => {
        return item.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }

  getProducts() {
    this.service.getProducts()
      .then(response => {        
        this.products = response.data;

        this.products.forEach((a: any) => {
          Object.assign(a, {quantity:1, total:a.price})
        })
        console.log(this.products)
        // this.applyFilter();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  addCart(item: any) {
    this.service.addToCart(item);
  }
}
