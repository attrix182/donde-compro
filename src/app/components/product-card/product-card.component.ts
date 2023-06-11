import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: Product;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  errorHandler(event: any) {
    console.debug(event);
    event.target.src = "assets/no-image.jpeg";
 }


  goToDetail(product: Product) {
    console.log(product);
    this.router.navigate(['/detail', product.id]);
  }
}
