import { Component, OnInit } from '@angular/core';

import { ProductModel } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  showMessage: boolean = false;
  product: ProductModel = new ProductModel();

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

  onSubmit() {
    this.product.id = Date.now();

    console.log("New product details submitted.");

    this.products.unshift(this.product);
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
