import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PricesApiService } from '../services/prices-api.service';
import { DetailProductResponse } from '../models/models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: string = '';
  detail!: DetailProductResponse | any;
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





  goToMoreCheap() {
    let precioMasBajo = Infinity;
    let idMasBarato = '';

    for (const sucursal of this.detail.sucursales) {
      const precioLista = sucursal.preciosProducto.precioLista;
      if (precioLista < precioMasBajo) {
        precioMasBajo = precioLista;
        idMasBarato = sucursal.id;
      }
    }

    let el = document.getElementById(idMasBarato);
    el!.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el!.classList.add('cheaper')
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
