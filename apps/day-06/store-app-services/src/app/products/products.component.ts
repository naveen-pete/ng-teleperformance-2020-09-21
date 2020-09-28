import { Component, OnInit } from '@angular/core';

import { ProductModel } from './product.model';
import { ProductsService } from './products.service';

// tight coupling

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productToEdit: ProductModel;
  service: ProductsService;

  products: ProductModel[] = [];

  constructor(service: ProductsService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.products = this.service.getProducts();
  }

  onCreateProduct(newProduct: ProductModel) {
    newProduct.id = Date.now();
    this.products.unshift(newProduct);
  }

  onUpdateProduct(product: ProductModel) {
    // solution #1
    this.products = this.products.map(p => p.id === product.id ? product : p);

    // solution #2
    // const productToUpdate = this.products.find(p => p.id === product.id);
    // if (productToUpdate) {
    //   productToUpdate.name = product.name;
    //   productToUpdate.description = product.description;
    //   productToUpdate.price = product.price;
    //   productToUpdate.isAvailable = product.isAvailable;
    // }

    this.productToEdit = null;
  }

  onCancelEditProduct() {
    this.productToEdit = null;
  }

  onEditProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      this.productToEdit = { ...product };
    }
  }

  onDeleteProduct(id: number) {
    // solution #1
    const index = this.products.findIndex(p => p.id === id);
    this.products.splice(index, 1);

    // solution #2
    // this.products = this.products.filter(p => p.id !== id);
  }

}
