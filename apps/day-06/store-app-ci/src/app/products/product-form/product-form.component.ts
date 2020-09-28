import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductModel } from '../product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  showMessage: boolean = false;
  product: ProductModel = new ProductModel();

  @Output() createProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void { }

  onCreate() {
    const price = +this.product.price;
    const newProduct: ProductModel = {
      ...this.product,
      price: isNaN(price) ? 0 : price,
      isAvailable: this.product.isAvailable || false
    }

    this.createProduct.emit(newProduct);
    this.product = new ProductModel();

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);

  }

}
