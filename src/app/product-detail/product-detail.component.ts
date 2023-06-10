import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: string = '';
  detail: any;

  constructor(private router: Router, private http: HttpClient) {
    this.id = this.router.url.split('/')[2];
    this.getProductoDetalle(this.id);
  }

  ngOnInit(): void {
  }

  getProductoDetalle(id: any) {
    const url = 'https://d3e6htiiul5ek9.cloudfront.net/prod/producto';
    const params = {
      limit: '2',
      id_producto: id,
      array_sucursales: '23-1-6212,23-1-6210,3-1-1158,10-2-254,15-1-158,15-1-1008,10-2-278,10-2-202,15-1-100,10-3-436,10-1-1,9-2-235,15-1-1038,15-1-5341,2003-1-7530,12-1-68,19-1-03267,19-1-30548,12-1-192,15-1-204,2011-1-150,9-3-5202,2003-1-7390,2008-1-660,10-3-425,15-1-5534,10-2-201,19-1-02987,15-1-87,19-1-00160'
    };

    this.http.get(url, { params }).subscribe(
      (data :any) => {
        this.detail = data;
        console.log(data); // Realiza las acciones que desees con los datos recibidos
      }
    )
  }

}
