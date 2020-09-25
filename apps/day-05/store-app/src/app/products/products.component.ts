import { Component, OnInit } from '@angular/core';

import { ProductModel } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // product: ProductModel = {
  //   id: 1,
  //   name: 'iPhone 11',
  //   price: 45000,
  //   description: 'Smart phone from Apple',
  //   isAvailable: true
  // };

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

  constructor() {
    // this.product.id = 10;
    // this.product.name = ''
  }

  ngOnInit(): void {
  }

  applyStyle(isAvailable) {
    return { color: isAvailable ? 'blue' : 'red' };
  }


}
