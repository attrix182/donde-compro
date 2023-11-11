import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PricesApiService } from 'src/app/services/prices-api.service';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.scss']
})
export class ModalLocationComponent {
  @Output() closeModal = new EventEmitter();
  @ViewChild('inputAddress') inputAddress: any;

  close() {
    this.closeModal.emit();
  }
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
      this.addressText = res[0].display_name;
    });
    console.log(this.geo);
  }

  getLocalAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
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
