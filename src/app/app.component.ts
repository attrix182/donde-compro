import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'donde-compro';
  searchValue!: string;
  results!: ApiResponse;

  constructor(private http: HttpClient, private router: Router) {}

  // Método para realizar la solicitud GET
  search() {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/productos';
    const params = {
      string: this.searchValue,
      array_sucursales:
        '15-1-5486,15-1-5188,10-1-227,15-1-5163,10-3-465,12-1-130,15-1-5149,11-5-1018,10-3-443,19-1-00825,10-3-459,15-1-25,19-1-03232,15-1-143,12-1-104,10-1-7,15-1-5573,19-1-03298,19-1-03299,11-2-1050,15-1-1047,2004-1-1,10-3-446,15-1-5363,23-1-6283,12-1-65,15-1-5132,10-3-462,15-1-5547,15-1-155',
      offset: '0',
      limit: '50',
      sort: '-cant_sucursales_disponible'
    };

    this.http.get(url, { params }).subscribe(
      (data: any) => {
        this.results = data;
        console.log(data); // Realiza las acciones que desees con los datos recibidos
      },
      (error) => {
        console.error(error); // Maneja cualquier error que ocurra
      }
    );
  }

  goToDetail(product: Producto) {
    console.log(product);
    this.router.navigate(['/detail', product.id]);
  }
}
