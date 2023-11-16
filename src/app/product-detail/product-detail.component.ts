
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        console.log(position);
        this.geo = { lat: position.coords.latitude, lon: position.coords.longitude };
        this.pricesApi.setGeo(this.geo);
      });
    }
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
