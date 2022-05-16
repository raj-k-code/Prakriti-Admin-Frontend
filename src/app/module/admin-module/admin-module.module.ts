import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { UserComponent } from './component/user/user.component';
import { HomesComponent } from './component/homes/homes.component';
import { DefaultComponent } from './component/default/default.component';


@NgModule({
  declarations: [
    UserComponent,
    HomesComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule
  ]
})
export class AdminModuleModule {
  constructor() {
    console.log("Admin Module Runnig");
  }
}
