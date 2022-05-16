import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseryModuleRoutingModule } from './nursery-module-routing.module';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NurseryModuleRoutingModule
  ]
})
export class NurseryModuleModule {
  constructor() {
    console.log("Nursery Module Runnig");
  }
}
