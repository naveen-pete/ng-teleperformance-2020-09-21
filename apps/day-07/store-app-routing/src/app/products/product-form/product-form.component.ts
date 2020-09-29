import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ProductModel } from '../product.model';
import { ProductsService } from '../products.service';
import { LoggerService } from '../../common/logger.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  showMessage: boolean = false;
  createNew: boolean;

  @Input() product: ProductModel;

  @Output() cancelEditProduct = new EventEmitter();

  constructor(
    private service: ProductsService,
    private logger: LoggerService
  ) { }

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
    this.logger.log('Saving product information.');

    const price = +this.product.price;
    const product: ProductModel = {
      ...this.product,
      price: isNaN(price) ? 0 : price,
      isAvailable: this.product.isAvailable || false
    }

    if (this.createNew) {
      this.service.addProduct(product);
    } else {
      this.service.updateProduct(product);
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
