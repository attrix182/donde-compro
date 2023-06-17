import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursal, SucursalesResponse, buyOption, buyOptions, searchProductResponse } from '../models/models';
import { PricesApiService } from '../services/prices-api.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('inputAddress') inputAddress: any;
  searchValue!: string;
  address!: string;
  addressText!: string;
  results!: searchProductResponse | null;
  sucursales!: SucursalesResponse;
  geo: any;
  loading = false;
  showLocationModal = false;
  apiError = false;

  constructor(private router: Router, private priceApi: PricesApiService) {}

  ngOnInit(): void {
   // this.searchList();
    this.getPlacesToBuy();
  }

  getLocalAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geo = { lat: position.coords.latitude, lon: position.coords.longitude };
        this.priceApi.setGeo(this.geo);
        this.priceApi.getNameAddress(this.geo.lat, this.geo.lon).subscribe((res: any) => {
          this.addressText = res.display_name;
        });
      });
    }
  }

  ngAfterViewInit() {
    this.getLocalAddress();
  }

  search(event: any) {
    this.loading = true;
    this.results = null;
    this.searchValue = event;
    let sucursales: any = [];
    this.priceApi
      .getSucursales(this.geo.lat, this.geo.lon)
      .subscribe((res: any) => {
        sucursales = this.mapArraySucursales(res);
      })
      .add(() => {
        this.priceApi
          .searchWithSucursales(this.searchValue, sucursales)
          .subscribe((res: any) => {
            this.results = res;
          })
          .add(() => {
            this.loading = false;
          });
      });
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
    console.log(stringSucursalIds);
    return stringSucursalIds;
  }

  toggleLocationModal() {
    this.showLocationModal = !this.showLocationModal;
  }

  searchList() {
    let list = ['agua', 'pepsi', 'manteca', 'harina'];
    let sucursales = [
      '15-1-5486,15-1-5188,10-1-227,10-3-465,15-1-5163,12-1-130,15-1-5149,10-3-443,11-5-1018,19-1-00825,15-1-25,10-3-459,19-1-03232,15-1-143,19-1-03298,19-1-03299,12-1-104,10-1-7,15-1-5573,15-1-1047,11-2-1050,10-3-446,2004-1-1,15-1-5363,12-1-65,23-1-6283,15-1-5132,10-3-462,15-1-5547,2003-1-7160'
    ];
    this.priceApi
      .searchListOfProducts(list, sucursales)
      .subscribe((results: searchProductResponse[]) => console.log(this.getProductsId(results)));
  }

  getProductsId(res: searchProductResponse[]): string[] {
    const productIds: string[] = [];

    res.forEach((response: searchProductResponse) => {
      if (response.productos && response.productos.length > 0) {
        productIds.push(response.productos[0].id);
      }
    });

    return productIds;
  }

  getPlacesToBuy() {
    const productsID = ['7798062548679', '7791813555049', '7790742345806', '7790070507228'];

    const sucursales = [
      '15-1-5486,15-1-5188,10-1-227,10-3-465,15-1-5163,12-1-130,15-1-5149,10-3-443,11-5-1018,19-1-00825'
    ];
    this.priceApi.searchTotalPriceInEachMarket(productsID, sucursales).subscribe((res: any) => {
      console.log(res);
      this.getBestPlaceToBuy(res);
    });
  }

  getBestPlaceToBuy(places: any) {
    let results: any[] = [];
    console.log(places);
    places.forEach((place: any) => {
      place.sucursales.forEach((sucursal: any) => {
        results.push({
          producto: place.producto,
          sucursal,
          prodcutoId: place.producto.id,
          sucursalId: sucursal.id,
          precio: sucursal.preciosProducto?.precioLista
        });
      });
    });
    console.log(results);
    let totals = this.calculateCarts(results);
    console.log(totals);
  }

  calculateCarts(options: buyOptions[]) {
    let buyOptions: buyOption[] = [];
    const result = options.reduce((accumulator: any, item) => {
      const existingItem: any = accumulator.find((x: any) => x.sucursalId === item.sucursalId);
      if (existingItem) {
        existingItem.totalPrice += item.precio;
      } else {
        accumulator.push({
          sucursal: item.sucursal,
          sucursalId: item.sucursalId,
          totalPrice: item.precio
        });
      }

      return accumulator;
    }, []);
    return result;
  }
}
//productos.push({id: 1, sucursal: res.sucursal, precio: res.preciosProducto?.precioLista});
