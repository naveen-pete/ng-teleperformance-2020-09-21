import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductModel } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: ProductModel = new ProductModel();

  @Output() editProduct = new EventEmitter<number>();

  constructor(private service: ProductsService) { }

  ngOnInit(): void { }

  onDelete() {
    if (window.confirm('Are you sure?')) {
      this.service.deleteProduct(this.product.id);
    }
  }

  onEdit() {
    this.editProduct.emit(this.product.id);
  }
}
