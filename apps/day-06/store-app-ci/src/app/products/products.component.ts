import { Component, OnInit } from '@angular/core';

import { ProductModel } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productToEdit: ProductModel;

  products: ProductModel[] = [
    {
      id: 1,
      name: 'iPhone X',
      description: 'A mobile phone from Apple',
      isAvailable: true,
      price: 60000
    },
    {
      id: 2,
      name: 'Samsung Galaxy Note 10',
      description: 'A mobile phone from Samsung',
      isAvailable: true,
      price: 80000
    },
    {
      id: 3,
      name: 'Google Pixel 3',
      description: 'A mobile phone from Google',
      isAvailable: false,
      price: 50000
    }
  ];

  constructor() { }

  ngOnInit(): void { }

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
    // const index = this.products.findIndex(p => p.id === id);
    // if (index >= 0) {
    //   this.products.splice(index, 1);
    // }

    // solution #2
    this.products = this.products.filter(p => p.id !== id);
  }

}
