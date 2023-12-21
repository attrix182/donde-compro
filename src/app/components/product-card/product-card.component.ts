import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {
  @Input('product') product!: Product;
  @Input('searchValue') searchValue: string = '';

  constructor(private router:Router) { }


  errorHandler(event: any) {
    console.debug(event);
    event.target.src = "assets/no-image.webp";
 }


  goToDetail(product: Product) {
    this.router.navigate(['/detail', product.id], { queryParams: {  search: this.searchValue } });
  }
}
