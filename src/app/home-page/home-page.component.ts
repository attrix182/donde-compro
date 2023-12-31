import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SucursalesResponse, searchProductResponse } from '../models/models';
import { PricesApiService } from '../services/prices-api.service';
import { SearchService } from '../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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
  locationError:string = '';

  constructor(private priceApi: PricesApiService, private searchSVC:SearchService, private route: ActivatedRoute) {}

  showInfo(){
    this.results = null;
  }

  searchWithURL(){
   let value = this.route.snapshot.queryParamMap.get('search');
   if(value){
    this.loading = true;
    this.searchValue = decodeURIComponent(value);
    this.search(this.searchValue);
   }else{
    this.loading = false;
   }
  }
  getLocalAddress() {
    //pedir permisos ubicacio

    const storedGeo = this.priceApi.getStoredGeo();
    if (storedGeo) {
      this.geo = storedGeo;
      this.priceApi.setGeo(this.geo);
      this.priceApi.getNameAddress(this.geo.lat, this.geo.lon).subscribe((res: any) => {
        this.addressText = res.display_name;
        this.searchWithURL();
      });
    }else{

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geo = { lat: position.coords.latitude, lon: position.coords.longitude };
        this.priceApi.setGeo(this.geo);
        this.priceApi.getNameAddress(this.geo.lat, this.geo.lon).subscribe((res: any) => {
          this.addressText = res.display_name;
          this.searchWithURL();
        });
      }, (error) => {
        console.log(error.message);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            this.locationError = 'No otorgaste permisos de ubicación a la web, configuralo desde tu navegador.'
              break;
          case error.POSITION_UNAVAILABLE:
              this.locationError = 'Ubicacion no disponible.'
              break;
          case error.TIMEOUT:
              // Se ha excedido el tiempo para obtener la ubicación.
              break;
      }
      });
    }
  }

  }

  ngAfterViewInit() {
    this.getLocalAddress();
  }

  search(event: any) {
    this.searchValue = event;
    this.apiError = false;
    this.loading = true;
    this.results = null;
    this.searchSVC.search(event, this.geo).then((res: any) => {
      console.log(res);
      if(res.status === 400){
        this.apiError = true;
      }
      this.results = res;
      this.loading = false;
    }, err => {
      console.log('err');
      this.loading = false;
      this.apiError = true;
    });
  }

  toggleLocationModal() {
    this.showLocationModal = !this.showLocationModal;
    this.getLocalAddress();
  }
}
