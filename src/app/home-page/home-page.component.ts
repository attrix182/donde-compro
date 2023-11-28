import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SucursalesResponse, searchProductResponse } from '../models/models';
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

  showInfo(){
    this.results = null;
  }

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
    this.apiError = false;
    this.loading = true;
    this.searchSVC.search(event, this.geo).then((res: any) => {
      console.log(res);
      if(res.status === 400){
        this.apiError = true;
      }
      this.results = res;
      this.loading = false;
    });
  }


  toggleLocationModal() {
    this.showLocationModal = !this.showLocationModal;
    this.getLocalAddress();
  }
}
