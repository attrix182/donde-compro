import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PricesApiService } from 'src/app/services/prices-api.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchValue!: string;
  totalItems: number = 0;

  constructor(private router: Router, private priceApi: PricesApiService, private shoppingCart: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCart.getCart().subscribe((res: any) => {
      this.totalItems = res.length;
    });
  }

  goBack(){
    this.router.navigate(['/']);
  }
  goToCartDetail() {
    this.router.navigate(['/cart']);
  }

}
