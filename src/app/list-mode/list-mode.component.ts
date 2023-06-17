import { Component, OnInit } from '@angular/core';
import { PricesApiService } from '../services/prices-api.service';
import { Sucursal, buyOption, buyOptions, searchProductResponse } from '../models/models';

@Component({
  selector: 'app-list-mode',
  templateUrl: './list-mode.component.html',
  styleUrls: ['./list-mode.component.scss']
})
export class ListModeComponent implements OnInit {
  address!: string;
  addressText!: string;
  results!: buyOption[];
  showLocationModal = false;
  loading = false;
  searchValue: string = '';
  productsList: string[] = [];
  productsIDs: any[] = [];
  sucursalesIds: string[] = [];
  geo: any;

  constructor(private priceApi: PricesApiService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getLocalAddress();
  }

  getLocalAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geo = { lat: position.coords.latitude, lon: position.coords.longitude };
        this.priceApi.setGeo(this.geo);
        this.priceApi.getNameAddress(this.geo.lat, this.geo.lon).subscribe((res: any) => {
          this.addressText = res.display_name;
        });
        this.getSucursales();
      });
    }
  }

  getSucursales() {
    this.priceApi.getSucursales(this.geo.lat, this.geo.lon).subscribe((res: any) => {
      this.sucursalesIds = this.mapArraySucursales(res);
      console.log(this.sucursalesIds);
    });
  }

  add(product: string) {
    if(!product) return;
    this.productsList.push(product);
    console.log(this.productsList);
  }

  toggleLocationModal() {
    this.showLocationModal = !this.showLocationModal;
  }

  searchPrices() {

    this.productsIDs = this.searchList(this.productsList, this.sucursalesIds);
    console.log(this.productsIDs);

  }

  mapArraySucursales(response: any) {
    const arraySucursalIds: any = [];

    response.sucursales.forEach((sucursal: Sucursal)=> {
      const comercioId = sucursal.comercioId;
      const banderaId = sucursal.banderaId;
      const sucursalId = sucursal.sucursalId;
      const sucursalIdString = `${comercioId}-${banderaId}-${sucursalId}`;
      arraySucursalIds.push(sucursalIdString);
    });

    let stringSucursalIds = [];
    stringSucursalIds.push(arraySucursalIds.join(','));

    return stringSucursalIds;
  }

  searchList(productsList: string[], sucursales: string[]) {
    let ids: string[] = [];
    this.priceApi
      .searchListOfProducts(productsList, sucursales)
      .subscribe((results: searchProductResponse[]) => (ids = this.getProductsId(results)));

    return ids;
  }

  getProductsId(res: searchProductResponse[]): string[] {
    const productIds: string[] = [];

    res.forEach((response: searchProductResponse) => {
      if (response.productos && response.productos.length > 0) {
        productIds.push(response.productos[0].id);
        this.productsIDs.push(response.productos[0].id);
        console.log(this.productsIDs);
        console.log(this.sucursalesIds);
        this.getPlacesToBuy(this.productsIDs, this.sucursalesIds);
      }
    });

    return productIds;
  }

  getPlacesToBuy(productsID: string[], sucursales: string[]) {
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
          productoId: place.producto.id,
          sucursalId: sucursal.id,
          precio: sucursal.preciosProducto?.precioLista
        });
      });
    });
    console.log(results);
    let totals = this.calculateCarts(results);
    this.results = totals;
    console.log(totals);
  }

  calculateCarts(options: buyOptions[]): buyOption[] {
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
