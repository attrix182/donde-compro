import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SEARCHER_MOCK } from 'src/mocks/products-mock';

export interface Producto {
  marca: string;
  id: string;
  precioMax: number;
  precioMin: number;
  nombre: string;
  presentacion: string;
  cantSucursalesDisponible: number;
}

export interface ApiResponse {
  status: number;
  total: number;
  maxLimitPermitido: number;
  maxCantSucursalesPermitido: number;
  productos: Producto[];
  totalPagina: number;
  agrupables: any[]; // Si tienes información sobre la estructura de los datos en "agrupables", puedes proporcionar una interfaz específica para ellos
}

@Component({
  selector: 'app-product-searcher',
  templateUrl: './product-searcher.component.html',
  styleUrls: ['./product-searcher.component.scss']
})
export class ProductSearcherComponent {

  title = 'donde-compro';
  searchValue!: string;
  results!: ApiResponse;
  //results: ApiResponse = SEARCHER_MOCK;

  constructor(private http: HttpClient, private router: Router) {}

  // Método para realizar la solicitud GET
  search() {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/productos';
    const params = {
      string: this.searchValue,
      array_sucursales:
        '23-1-6212,23-1-6210,3-1-1158,10-2-254,15-1-158,15-1-1008,10-2-278,10-2-202,15-1-100,10-3-436,10-1-1,9-2-235,15-1-1038,15-1-5341,2003-1-7530,12-1-68,19-1-03267,19-1-30548,12-1-192,15-1-204,2011-1-150,9-3-5202,2003-1-7390,2008-1-660,10-3-425,15-1-5534,10-2-201,19-1-02987,15-1-87,19-1-00160',
      offset: '0',
      limit: '50',
      sort: '-cant_sucursales_disponible'
    };

    this.http.get(url, { params }).subscribe(
      (data: any) => {
        this.results = data;
      },
      (error) => {
        console.error(error); // Maneja cualquier error que ocurra
      }
    );
  }

  goToDetail(product: Producto) {
    this.router.navigate(['/detail', product.id]);
  }

  errorHandler(event: any) {
    console.debug(event);
    event.target.src = "assets/no-image.jpeg";
 }
}
