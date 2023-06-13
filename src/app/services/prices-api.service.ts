import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/models';
@Injectable({
  providedIn: 'root'
})
export class PricesApiService {
  geo: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {}

  setGeo(geo: any) {
    this.geo.next(geo);
  }

  getGeo() {
    if(!this.geo) this.getLocalAddress();
    return this.geo.asObservable();
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
  search(searchValue: string, lat: number, lng: number, limit = 50) {
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
}
