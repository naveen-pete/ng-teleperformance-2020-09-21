import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProductModel } from './product.model';
import { LoggerService } from '../common/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  refreshProducts = new Subject<ProductModel[]>();

  private products: ProductModel[] = [];

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  // Called from ProductsComponent
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl).pipe(
      tap((products) => {
        console.log('tap() callback invoked', products);
        this.products = products;
      })
    );
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
  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiUrl, product).pipe(
      tap(product => {
        this.products = [...this.products, product];
        this.refreshProducts.next([...this.products]);
      })
    );
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
