import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, searchProductResponse } from '../models/models';
@Injectable({
  providedIn: 'root'
})
export class PricesApiService {
  geo: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {}

  setGeo(geo: any) {
    localStorage.setItem('geoDC', JSON.stringify(geo));
    this.geo.next(geo);
  }

  getGeo() {
    if (!this.geo) this.getLocalAddress();
    return this.geo.asObservable();
  }

  getStoredGeo(){
    const geo = localStorage.getItem('geoDC');
    if (geo) {
      return JSON.parse(geo);
    }
  }

  getNameAddress(lat: number, lon: number) {
    {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

      return this.http.get<any>(url);
    }
  }

  geocodeAddress(address: any) {
    const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address);
    return this.http.get(url);
  }

  // Método para realizar la solicitud GET
  searchWithCoords(searchValue: string, lat: number, lng: number, limit = 50) {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/productos';
    const params = {
      string: searchValue,
      lat: lat,
      lng: lng,
      offset: '0',
      limit: limit,
      sort: '-cant_sucursales_disponible'
    };

    return this.http.get(url, { params });
  }

  searchWithSucursales(searchValue: string, arraySucursales: string, limit = 50) {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/productos';
    const params = {
      string: searchValue,
      array_sucursales: arraySucursales,
      offset: '0',
      limit: limit,
      sort: '-cant_sucursales_disponible'
    };

    return this.http.get(url, { params });
  }

  getSucursales(lat: number, lng: number) {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales';
    const params = {
      lat: lat,
      lng: lng
    };
    return this.http.get(url, { params });
  }

  getLocalAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geo.next({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    }
  }

  getProductoDetalle(id: string, lat: number, lng: number, limit = 50) {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/producto';
    const params = {
      limit: limit,
      id_producto: id,
      lat: lat,
      lng: lng
    };

    return this.http.get(url, { params });
  }

  searchListOfProducts(
    searchValues: string[],
    arraySucursales: string[],
    limit = 50
  ): Observable<searchProductResponse[]> {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/productos';
    const requests: Observable<any>[] = [];

    for (const searchValue of searchValues) {
      const params = new HttpParams()
        .set('string', searchValue)
        .set('array_sucursales', arraySucursales.join(','))
        .set('offset', '0')
        .set('limit', limit.toString())
        .set('sort', '-cant_sucursales_disponible');

      const request = this.http.get(url, { params });
      requests.push(request);
    }

    return forkJoin(requests).pipe(map((responses) => responses.filter((response) => response !== null)));
  }

  searchTotalPriceInEachMarket(productsIds: string[], arraySucursales: string[]) {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/producto';

    const observables: Observable<any>[] = [];

    for (const id of productsIds) {
      const params = {
        limit: 50,
        id_producto: id,
        array_sucursales: arraySucursales
      };

      observables.push(this.http.get(url, { params }));
    }

    return forkJoin(observables).pipe(
      map((responses: any[]) => {
        let returned: any[] = [];
        for (const response of responses) {
          if (response) {
            returned.push(response);
          }
        }

        return returned;
      })
    );
  }
}
