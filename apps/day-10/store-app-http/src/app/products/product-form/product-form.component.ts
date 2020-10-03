import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../product.model';
import { ProductsService } from '../products.service';
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
  @ViewChild('productForm') form: NgForm;

  constructor(
    private service: ProductsService,
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
    const { name, description, price, isAvailable } = this.form.value;

    const product: ProductModel = {
      id: this.id,
      name: name,
      description: description,
      price: isNaN(parseInt(price)) ? 0 : parseInt(price),
      isAvailable: isAvailable || false
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
