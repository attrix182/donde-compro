import { Injectable } from '@angular/core';
import { PricesApiService } from './prices-api.service';
import { Sucursal } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private priceApi: PricesApiService) {}

  search(event: any, geo: any) {
    let results: any = [];
    const searchValue = event;
    let sucursales: any = [];

    let finish = new Promise((resolve, reject) => {
      if (Array.isArray(geo)) geo = geo[0];
      this.priceApi
        .getSucursales(geo.lat, geo.lon)
        .subscribe((res: any) => {
          sucursales = this.mapArraySucursales(res);
        })
        .add(() => {
          this.priceApi
            .searchWithSucursales(searchValue, sucursales)
            .subscribe((res: any) => {
              results = res;
              resolve(results);
            })
            .add(() => {
              resolve(results);
            });
        });
    })

    return finish;
  }

  mapArraySucursales(response: any) {
    const arraySucursalIds: any = [];

    response.sucursales.forEach((sucursal: Sucursal) => {
      const comercioId = sucursal.comercioId;
      const banderaId = sucursal.banderaId;
      const sucursalId = sucursal.sucursalId;
      const sucursalIdString = `${comercioId}-${banderaId}-${sucursalId}`;
      arraySucursalIds.push(sucursalIdString);
    });

    const stringSucursalIds = arraySucursalIds.join(', ');
    return stringSucursalIds;
  }
}
