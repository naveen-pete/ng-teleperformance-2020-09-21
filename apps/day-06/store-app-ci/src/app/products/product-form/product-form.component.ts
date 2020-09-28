import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ProductModel } from '../product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  showMessage: boolean = false;
  createNew: boolean;

  @Input() product: ProductModel;

  @Output() createProduct = new EventEmitter<ProductModel>();
  @Output() updateProduct = new EventEmitter<ProductModel>();
  @Output() cancelEditProduct = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product.currentValue) {
      this.createNew = false;
    } else {
      this.product = new ProductModel();
      this.createNew = true;
    }
  }

  ngOnInit(): void { }

  onSubmit() {
    const price = +this.product.price;
    const product: ProductModel = {
      ...this.product,
      price: isNaN(price) ? 0 : price,
      isAvailable: this.product.isAvailable || false
    }

    if (this.createNew) {
      this.createProduct.emit(product);
    } else {
      this.updateProduct.emit(product);
    }
    this.product = new ProductModel();

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  onCancel() {
    this.cancelEditProduct.emit();
  }

}
