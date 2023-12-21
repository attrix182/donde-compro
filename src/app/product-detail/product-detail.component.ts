
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PricesApiService } from '../services/prices-api.service';
import { DetailProductResponse } from '../models/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  id: string = '';
  detail!: DetailProductResponse | any;
  geo: any;
  searchValue:string = ''
  constructor(private router: Router, private pricesApi: PricesApiService, private titleService:Title) {
    this.id = this.router.url.split('/')[2].split('?')[0];
    this.searchValue = this.router.url.split('?')[1]?.split('=')[1] || '';
  }

  ngAfterViewInit() {
    this.geo = this.pricesApi.getStoredGeo();
    if (!this.geo){
      this.getLocalAddress();
    }
    this.getProductoDetalle(this.id);
  }
  getLocalAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geo = { lat: position.coords.latitude, lon: position.coords.longitude };
        this.pricesApi.setGeo(this.geo);
      });
    }
  }

  getProductoDetalle(id: any) {
    this.pricesApi.getProductoDetalle(id, this.geo.lat, this.geo.lon).subscribe((data: any) => {
      this.detail = data;
      this.titleService.setTitle(data.producto.nombre || 'Donde compro');
    });
  }

  goToMoreCheap() {
    let precioMasBajo = Infinity;
    let idMasBarato = '';

    for (const sucursal of this.detail.sucursales) {
      const precioLista = sucursal.preciosProducto.precioLista;
      console.log(precioLista);
      if (precioLista > 0 && precioLista < precioMasBajo) {
        precioMasBajo = precioLista;
        idMasBarato = sucursal.id;
      }
    }
    console.log(idMasBarato);
    let el = document.getElementById(idMasBarato);
    el!.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el!.classList.add('cheaper')
  }

  goBack() {
    this.titleService.setTitle('Donde compro');
    this.router.navigate(['/'], { queryParams: { search: this.searchValue } });
  }

}
