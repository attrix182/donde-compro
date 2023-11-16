import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursal, SucursalesResponse, buyOption, buyOptions, searchProductResponse } from '../models/models';
import { PricesApiService } from '../services/prices-api.service';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit {
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

  constructor(private priceApi: PricesApiService, private searchSVC:SearchService) {}

  getLocalAddress() {

    const storedGeo = this.priceApi.getStoredGeo();
    if (storedGeo) {
      this.geo = storedGeo;
      this.priceApi.setGeo(this.geo);
      this.priceApi.getNameAddress(this.geo.lat, this.geo.lon).subscribe((res: any) => {
        this.addressText = res.display_name;
      });
    }else{

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

  }

  ngAfterViewInit() {
    this.getLocalAddress();
  }

  search(event: any) {
    this.loading = true;
    this.searchSVC.search(event, this.geo).then((res: any) => {
      this.results = res;
      this.loading = false;
    });
  }


  toggleLocationModal() {
    this.showLocationModal = !this.showLocationModal;
    this.getLocalAddress();
  }
}
