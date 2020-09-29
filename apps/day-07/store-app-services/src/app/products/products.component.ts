import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductModel } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productToEdit: ProductModel;
  subRefreshProducts: Subscription;

  products: ProductModel[] = [];

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.subRefreshProducts = this.service.refreshProducts.subscribe((products: ProductModel[]) => {
      this.products = products;
    })

    this.products = this.service.getAllProducts();
  }

  onCancelEditProduct() {
    this.productToEdit = null;
  }

  onEditProduct(id: number) {
    this.productToEdit = this.service.getProduct(id);
  }

  ngOnDestroy() {
    if (this.subRefreshProducts) {
      this.subRefreshProducts.unsubscribe();
    }
  }

}
