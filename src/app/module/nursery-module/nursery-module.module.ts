import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseryModuleRoutingModule } from './nursery-module-routing.module';
import { HomeComponent } from './component/home/home.component';
import { DefaultComponent } from './component/default/default.component';
import { ProductComponent } from './component/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeComponent,
    DefaultComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    NurseryModuleRoutingModule,
    CommonModule,
    NgxPaginationModule
  ]
})
export class NurseryModuleModule {
  constructor() {
    console.log("Nursery Module Runnig");
  }
}
