import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductModel } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  subRefreshProducts: Subscription;

  products: ProductModel[] = [];

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.subRefreshProducts = this.service.refreshProducts.subscribe((products: ProductModel[]) => {
      this.products = products;
    })

    this.products = this.service.getAllProducts();
  }

  ngOnDestroy() {
    if (this.subRefreshProducts) {
      this.subRefreshProducts.unsubscribe();
    }
  }

}
