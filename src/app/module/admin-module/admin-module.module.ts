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
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QueryListComponent } from './component/query-list/query-list.component';
import { ViewOrderComponent } from './component/view-order/view-order.component';
import { ViewParticularOdorderComponent } from './component/view-particular-odorder/view-particular-odorder.component';


@NgModule({
  declarations: [
    UserComponent,
    HomesComponent,
    DefaultComponent,
    GardenerComponent,
    NurseryComponent,
    ViewProductComponent,
    CategoryComponent,
    OrderHistoryComponent,
    QueryListComponent,
    ViewOrderComponent,
    ViewParticularOdorderComponent,
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    NgbModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class AdminModuleModule {
  constructor() {
    console.log("Admin Module Runnig");
  }
}
