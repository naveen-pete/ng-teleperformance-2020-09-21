import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductModel } from '../products/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  showMessage: boolean = false;
  product: ProductModel = new ProductModel();

  @Output() productCreated: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.product.id = Date.now();

    console.log("New product details submitted.");

    // this.products.unshift(this.product);
    this.productCreated.emit(this.product);
    this.product = new ProductModel();

    console.log('onSubmit() this:', this);
    // var obj = this;

    this.showMessage = true;

    // Anonymous function syntax - ES5
    // setTimeout(function () {
    //   console.log('callback() this:', this);
    //   obj.showMessage = false;
    //   console.log('showMessage property reset to false..');
    // }, 5000);

    // Arrow function syntax - ES6
    setTimeout(() => {
      console.log('callback() this:', this);
      this.showMessage = false;
      console.log('showMessage property reset to false..');
    }, 5000);

  }

}
