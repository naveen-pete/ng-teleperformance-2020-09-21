import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productId: number = 10;
  productName: string = 'Samsung Galaxy Note 10'; // M-V- ViewModel
  productPrice: number = 50000;

  constructor() {
    // this.productId = 10;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Product saved...');
  }

  onSearch(e) {
    console.log('Searching...', e.target.value);
  }

}
