import { Injectable } from '@angular/core';

import { ProductModel } from './product.model';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ProductsService {

  private products: ProductModel[] = [
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

  // Called from ProductsComponent
  getAllProducts(): ProductModel[] {
    return [...this.products];
  }

  // Called from ProductsComponent
  getProduct(id: number): ProductModel {
    let product: ProductModel;

    const tempProduct = this.products.find(p => p.id === id);
    if (tempProduct) {
      product = { ...tempProduct };
    }

    return product;
  }

  // Called from ProductFormComponent
  addProduct(product: ProductModel) {
    product.id = Date.now();
    this.products = [...this.products, product];
  }

  // Called from ProductFormComponent
  updateProduct(product: ProductModel) {
    this.products = this.products.map(p => p.id === product.id ? product : p);
  }

  // Called from ProductDetailComponent
  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}
