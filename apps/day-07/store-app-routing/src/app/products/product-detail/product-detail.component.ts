import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductModel } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: ProductModel = new ProductModel();

  @Output() editProduct = new EventEmitter<number>();

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      this.id = +map.get('id');
      this.product = this.service.getProduct(this.id);
    });
  }

  onDelete() {
    if (window.confirm('Are you sure?')) {
      this.service.deleteProduct(this.product.id);
    }
  }

  onEdit() {
    this.editProduct.emit(this.product.id);
  }
}
