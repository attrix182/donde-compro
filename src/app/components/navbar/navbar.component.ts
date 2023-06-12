import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PricesApiService } from 'src/app/services/prices-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('inputAddress') inputAddress: any;
  searchValue!: string;
  address!: string;
  addressText!: string;
  geo: any;

  constructor(private router: Router, private priceApi: PricesApiService) {}

  ngOnInit(): void {
  }

  getAddress() {
    this.priceApi.geocodeAddress(this.address).subscribe((res: any) => {
      this.geo = res[0];
      this.priceApi.setGeo(this.geo);
    });
  }

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

}
