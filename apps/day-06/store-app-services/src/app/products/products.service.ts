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

  // needed for ProductsComponent
  getProducts(): ProductModel[] {
    // ES5
    // return this.products.slice();

    // ES6
    return [...this.products];
  }

  getOneProduct(id: number): ProductModel {
    return null;
  }

  // needed for ProductFormComponent
  addProduct(product: ProductModel) {
    product.id = Date.now();
    this.products.push(product);
  }

  updateProduct(product: ProductModel) { }

  deleteProduct(id: number) { }
}
