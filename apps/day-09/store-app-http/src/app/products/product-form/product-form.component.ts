import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../product.model';
import { ProductsService } from '../products.service';
import { LoggerService } from '../../common/logger.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id: number;
  showMessage: boolean = false;
  createNew: boolean = true;

  product: ProductModel = new ProductModel();

  constructor(
    private service: ProductsService,
    private logger: LoggerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      const productId = +map.get('id');
      if (productId) {
        this.id = productId;
        this.product = this.service.getProduct(this.id);
        this.createNew = false;
      }
    });
  }

  onSubmit() {
    this.logger.log('Saving product information.');

    const price = +this.product.price;
    const product: ProductModel = {
      ...this.product,
      price: isNaN(price) ? 0 : price,
      isAvailable: this.product.isAvailable || false
    }

    if (this.createNew) {
      this.service.addProduct(product);
      this.router.navigate(['/products']);
    } else {
      this.service.updateProduct(product);
      this.router.navigate(['/products', this.id]);
    }
    this.product = new ProductModel();

    // this.showMessage = true;
    // setTimeout(() => {
    //   this.showMessage = false;
    // }, 5000);
  }

  onCancel() {
    this.router.navigate(['/products', this.id]);
  }

}
