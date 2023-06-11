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
  getAddress() {
    this.priceApi.geocodeAddress(this.address).subscribe((res: any) => {
      this.geo = res[0];
      this.priceApi.setGeo(this.geo);
    });
  }

  search() {
    this.loading = true;
    this.results = null;
    this.priceApi
      .search(this.searchValue, this.geo.lat, this.geo.lon)
      .subscribe((res: any) => {
        this.results = res;
      })
      .add(() => {
        this.loading = false;
      });
  }
}
