import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/models';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('searchValue') searchValue: string = '';
  cart: any[] = [];

  constructor(private router:Router, private shoppingCart: ShoppingCartService) { }

  ngOnInit(){
this.suscribeCart();
  }


  errorHandler(event: any) {
    console.debug(event);
    event.target.src = "assets/no-image.webp";
 }

  addToCart(product: Product) {
    this.shoppingCart.addToCart(product);
  }

  suscribeCart(){
    this.shoppingCart.getCart().subscribe((res: any) => {
      this.cart = res;
    });
  }

  removeFromCart(item:any){
    this.shoppingCart.removeFromCart(item);
  }

  itemInCart(item: any){
    return this.cart.find((x: any) => x.id === item.id);
  }

  goToDetail(product: Product) {
    this.router.navigate(['/detail', product.id], { queryParams: {  search: this.searchValue } });
  }
}
