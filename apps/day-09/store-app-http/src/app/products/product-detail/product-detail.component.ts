import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  disableDelete = false;
  id: number;
  product: ProductModel = new ProductModel();

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router
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
      this.router.navigate(['/products']);
    }
  }

  onEdit() {
    // http://localhost:4200/products/1/edit
    this.router.navigate(['/products', this.id, 'edit'])
  }
}
