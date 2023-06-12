import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSearcherComponent } from './product-searcher/product-searcher.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalLocationComponent } from './components/modal-location/modal-location.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductSearcherComponent,
    HomePageComponent,
    ProductCardComponent,
    NavbarComponent,
    ModalLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
