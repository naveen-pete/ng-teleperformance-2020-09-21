import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../product.model';
import { ProductsService } from '../products.service';
import { LoggerService } from '../../common/logger.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id: number;
  showMessage: boolean = false;
  createNew: boolean = true;

  product: ProductModel = new ProductModel();

  constructor(
    private service: ProductsService,
    private logger: LoggerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(map => {
        this.id = +map.get('id');
        if (this.id) {
          return this.service.getProduct(this.id);
        } else {
          return of(null);
        }
      })
    ).subscribe(
      (product) => {
        if (product) {
          this.product = product;
          this.createNew = false;
        } else {
          this.product = new ProductModel();
        }
      },
      (error) => {
        console.log('Get product failed.');
        console.log('Error:', error);
      }
    );
  }

  onSubmit() {
    const price = +this.product.price;
    const product: ProductModel = {
      ...this.product,
      price: isNaN(price) ? 0 : price,
      isAvailable: this.product.isAvailable || false
    }

    if (this.createNew) {
      this.addProduct(product);
    } else {
      this.updateProduct(product);
    }
  }

  private addProduct(product: ProductModel) {
    this.service.addProduct(product).subscribe(
      () => {
        this.router.navigate(['/products']);
      },   // success callback
      (error) => {
        console.log('Add product failed.');
        console.log('Error:', error);
      }    // failure callback
    );
  }

  private updateProduct(product: ProductModel) {
    this.service.updateProduct(product).subscribe(
      () => {
        this.router.navigate(['/products', this.id]);
      },   // success callback
      (error) => {
        console.log('Update product failed.');
        console.log('Error:', error);
      }    // failure callback
    );
  }

  onCancel() {
    this.router.navigate(['/products', this.id]);
  }

}
