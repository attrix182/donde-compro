import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PricesApiService } from 'src/app/services/prices-api.service';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.scss']
})
export class ModalLocationComponent {
  @Output() closeModal = new EventEmitter();
  @Input() error!: string;
  @ViewChild('inputAddress') inputAddress: any;

  close() {
    this.closeModal.emit();
  }
  searchValue!: string;
  address!: string;
  addressText!: string;
  geo: any;
  locationError = '';
  loading: boolean = false;

  constructor(private router: Router, private priceApi: PricesApiService) {}

  ngOnInit(): void {}

  getAddress() {
    this.loading = true;
    this.priceApi.geocodeAddress(this.address).subscribe(
      (res: any) => {
        this.geo = res[0];
        this.priceApi.setGeo(this.geo);
        this.addressText = res[0].display_name;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getLocalAddress() {
    if (navigator.geolocation) {
      this.loading = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.geo = { lat: position.coords.latitude, lon: position.coords.longitude };
        this.priceApi.setGeo(this.geo);
        this.priceApi.getNameAddress(this.geo.lat, this.geo.lon).subscribe(
          (res: any) => {
            this.addressText = res.display_name;
            this.inputAddress.nativeElement.placeholder = this.addressText;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            console.log(error.message);
            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.locationError = 'No otorgaste permisos de ubicación a la web, configuralo desde tu navegador.';
                break;
              case error.POSITION_UNAVAILABLE:
                this.locationError = 'Ubicacion no disponible.';
                break;
              case error.TIMEOUT:
                // Se ha excedido el tiempo para obtener la ubicación.
                break;
            }
          }
        );
      });
    }
  }

  ngAfterViewInit() {
    this.geo = this.priceApi.getStoredGeo();
    if (this.geo) {
      this.priceApi.getNameAddress(this.geo.lat, this.geo.lon).subscribe((res: any) => {
        this.addressText = res.display_name;
        this.inputAddress.nativeElement.placeholder = this.addressText;
      });
    } else {
      this.getLocalAddress();
    }
  }
}
