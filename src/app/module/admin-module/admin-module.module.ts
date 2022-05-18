import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { UserComponent } from './component/user/user.component';
import { HomesComponent } from './component/homes/homes.component';
import { DefaultComponent } from './component/default/default.component';
import { GardenerComponent } from './component/gardener/gardener.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NurseryComponent } from './component/nursery/nursery.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewProductComponent } from './component/view-product/view-product.component';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    HomesComponent,
    DefaultComponent,
    GardenerComponent,
    NurseryComponent,
    ViewProductComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    NgbModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class AdminModuleModule {
  constructor() {
    console.log("Admin Module Runnig");
  }
}
