import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { ProductModel } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input() product: ProductModel = new ProductModel();

  @Output() deleteProduct = new EventEmitter<number>();
  @Output() editProduct = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  onDelete() {
    if (window.confirm('Are you sure?')) {
      this.deleteProduct.emit(this.product.id);
    }
  }

  onEdit() {
    this.editProduct.emit(this.product.id);
  }

  ngOnDestroy() {
    console.log('ProductDetailComponent.ngOnDestroy() invoked.');
    console.log('the code to release the resource goes here.');
  }
}
