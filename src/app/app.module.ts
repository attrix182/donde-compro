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
import { InputSearcherComponent } from './components/input-searcher/input-searcher.component';
import { ListModeComponent } from './list-mode/list-mode.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductSearcherComponent,
    HomePageComponent,
    ProductCardComponent,
    NavbarComponent,
    ModalLocationComponent,
    InputSearcherComponent,
    ListModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
