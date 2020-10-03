import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  refreshProducts = new Subject<ProductModel[]>();

  private products: ProductModel[] = [];

  constructor(
    private http: HttpClient
  ) { }

  // Called from ProductsComponent
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl).pipe(
      tap((products) => {
        this.products = products;
      })
    );
  }

  // Called from ProductDetailComponent and ProductFormComponent
  getProduct(id: number): Observable<ProductModel> {
    const authToken = 'abc123';

    // http://localhost:3000/products?auth-token=abc123

    // return this.http.get<ProductModel>(this.apiUrl + '/' + id);
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`, {
      params: new HttpParams().set('auth-token', authToken)
    });
  }

  // Called from ProductFormComponent
  addProduct(product: ProductModel): Observable<ProductModel> {
    // retrieve the token from localstorage - localStorage.getItem('authToken');
    // const authToken = localStorage.getItem('authToken');
    const authToken = 'abc123';
    return this.http.post<ProductModel>(this.apiUrl, product, {
      headers: new HttpHeaders().set('my-auth-token', authToken)
    }).pipe(
      tap(product => {
        this.products = [...this.products, product];
        this.refreshProducts.next([...this.products]);
      })
    );
  }

  // Called from ProductFormComponent
  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.patch<ProductModel>(`${this.apiUrl}/${product.id}`, product).pipe(
      tap(product => {
        this.products = this.products.map(p => p.id === product.id ? product : p);
        this.refreshProducts.next([...this.products]);
      })
    );
  }

  // Called from ProductDetailComponent
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.products = this.products.filter(p => p.id !== id);
        this.refreshProducts.next([...this.products]);
      })
    );
  }
}
