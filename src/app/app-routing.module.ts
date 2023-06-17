import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSearcherComponent } from './product-searcher/product-searcher.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListModeComponent } from './list-mode/list-mode.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path: 'list-mode', component: ListModeComponent},
  { path: 'search', component: ProductSearcherComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
