import { Component, OnInit } from '@angular/core';
import { PricesApiService } from '../services/prices-api.service';
import { Sucursal, buyOption, buyOptions, searchProductResponse } from '../models/models';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

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
  productsList: any[] = [];
  productsIDs: any[] = [];
  sucursalesIds: string[] = [];
  geo: any;
  apiError = false;

  constructor(private router:Router, private priceApi: PricesApiService, private shoppingCart: ShoppingCartService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getCartProducts();
    this.getLocalAddress();
  }

  getCartProducts(){
    this.shoppingCart.getCart().subscribe((res: any) => {
      this.productsList = res;
    });

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
    });
  }

  deleteItem(item:string) {
    this.shoppingCart.removeFromCart(item);
    //this.productsList.splice(this.productsList.indexOf(item), 1);
    if(this.productsList.length == 0){
      this.results = [];
    }
  }

  errorHandler(event: any) {
    console.debug(event);
    event.target.src = "assets/no-image.webp";
 }

  add(product: string) {
    if(!product) return;
    this.productsList.push(product);
  }

  toggleLocationModal() {
    this.showLocationModal = !this.showLocationModal;
  }

  searchPrices() {
    this.loading = true;
    this.productsIDs = this.searchList(this.productsList, this.sucursalesIds);
  }


  goToSearcher(){
    this.router.navigate(['']);
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

  searchList(productsList: any[], sucursales: string[]) {
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
        this.getPlacesToBuy(this.productsIDs, this.sucursalesIds);
      }
    }, (error:any) => {
      console.log(error);
      this.apiError = true;
      this.loading = false;
    });

    return productIds;
  }

  getPlacesToBuy(productsID: string[], sucursales: string[]) {
    console.log(productsID, sucursales);
    this.priceApi.searchTotalPriceInEachMarket(productsID, sucursales).subscribe((res: any) => {
      this.getBestPlaceToBuy(res);
    },
    (error) => {
      console.log(error);
      this.apiError = true;
      this.loading = false;
    });
  }

  getBestPlaceToBuy(places: any) {
    let results: any[] = [];
    this.loading = false;
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
    this.loading = false;
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
