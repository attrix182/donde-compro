import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PricesApiService } from '../services/prices-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: string = '';
  detail: any;
  geo: any;

  constructor(private router: Router, private pricesApi: PricesApiService) {
    this.id = this.router.url.split('/')[2];
  }

  ngOnInit(): void {
    this.pricesApi.getGeo().subscribe((res: any) => {
      console.log(res);
      this.geo = res;
      this.getProductoDetalle(this.id);
    });
  }

  getProductoDetalle(id: any) {
    this.pricesApi.getProductoDetalle(id, this.geo.lat, this.geo.lon).subscribe((data: any) => {
      this.detail = data;
      console.log(data); // Realiza las acciones que desees con los datos recibidos
    });
  }
}
