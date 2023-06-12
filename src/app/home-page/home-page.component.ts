import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product, searchProductResponse } from '../models/models';
import { PricesApiService } from '../services/prices-api.service';
import { BehaviorSubject } from 'rxjs';

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
  geo: any;
  loading = false;
  showLocationModal = false;
  apiError = false;

  constructor(private router: Router, private priceApi: PricesApiService) {}

  ngOnInit(): void {}

  getLocalAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geo = { lat: position.coords.latitude, lon: position.coords.longitude };
        this.priceApi.setGeo(this.geo);
        this.priceApi.getNameAddress(this.geo.lat, this.geo.lon).subscribe((res: any) => {

          this.addressText = res.display_name;
          this.inputAddress.nativeElement.placeholder = this.addressText;
        });
      });
    }
  }

  ngAfterViewInit() {
    this.getLocalAddress();
  }

  search() {
    this.loading = true;
    this.results = null;
    this.priceApi
      .search(this.searchValue, this.geo.lat, this.geo.lon)
      .subscribe((res: any) => {
        this.results = res;
        res.status == 500 ? this.apiError = true : this.apiError = false;
      })
      .add(() => {
        this.loading = false;
      });
  }

  openLocationModal(){
    this.showLocationModal = true
  }

  closeLocationModal(){
    this.showLocationModal = false
  }
}
