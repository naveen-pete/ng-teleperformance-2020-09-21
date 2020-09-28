import { Component, OnInit, Input } from '@angular/core';

import { ProductModel } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: ProductModel = new ProductModel();

  constructor() { }

  ngOnInit(): void {
  }

}
