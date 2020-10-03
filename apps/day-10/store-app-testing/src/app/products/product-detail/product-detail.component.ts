import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
  product: ProductModel;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(map => {
        this.id = +map.get('id');
        return this.service.getProduct(this.id);
      })
    ).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.log('Get product failed.');
        console.log('Error:', error);
      }
    );
  }

  onDelete() {
    if (window.confirm('Are you sure?')) {
      this.service.deleteProduct(this.product.id).subscribe(
        () => {
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log('Delete product failed.');
          console.log('Error:', error);
        }
      );
    }
  }

  onEdit() {
    this.router.navigate(['/products', this.id, 'edit'])
  }
}
