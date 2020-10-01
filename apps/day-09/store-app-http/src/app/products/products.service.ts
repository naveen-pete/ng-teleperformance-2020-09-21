import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ProductModel } from './product.model';
import { LoggerService } from '../common/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  refreshProducts = new Subject<ProductModel[]>();

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

  constructor(private logger: LoggerService) { }

  // Called from ProductsComponent
  getAllProducts(): ProductModel[] {
    this.logger.log('Get all products invoked.');
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
    this.refreshProducts.next([...this.products]);
  }

  // Called from ProductFormComponent
  updateProduct(product: ProductModel) {
    this.products = this.products.map(p => p.id === product.id ? product : p);
    this.refreshProducts.next([...this.products]);
  }

  // Called from ProductDetailComponent
  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.refreshProducts.next([...this.products]);
  }
}
