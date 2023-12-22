import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
const modulesMaterial: any[] = [
  CommonModule,
  MatSliderModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  MatGridListModule,
  MatChipsModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    ...modulesMaterial
  ],
  // Lista de módulos que deseas exportar para que estén disponibles en otros módulos de tu aplicación
  exports: [
    ...modulesMaterial
    // Agrega otros módulos según tus necesidades
  ]
})
export class MaterialModule {

}
