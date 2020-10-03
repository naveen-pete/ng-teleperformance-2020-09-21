import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private service: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subRefreshProducts = this.service.refreshProducts.subscribe((products: ProductModel[]) => {
      this.products = products;
    });

    this.service.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },   // success callback
      (error) => {
        console.log('Get products failed.');
        console.log('Error:', error);
      }    // failure callback
    );
  }

  onAdd() {
    this.router.navigate(['/products/new']);
  }

  ngOnDestroy() {
    if (this.subRefreshProducts) {
      this.subRefreshProducts.unsubscribe();
    }
  }

}
