import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseryModuleRoutingModule } from './nursery-module-routing.module';
import { HomeComponent } from './component/home/home.component';
import { DefaultComponent } from './component/default/default.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewProductComponent } from './component/view-product/view-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GardenerListComponent } from './component/gardener-list/gardener-list.component';
import { ViewProfileComponent } from './component/view-profile/view-profile.component';
import { NgxSpinnerModule } from 'ngx-spinner'
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { BlogListComponent } from './component/blog-list/blog-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    DefaultComponent,
    ViewProductComponent,
    GardenerListComponent,
    ViewProfileComponent,
    ContactUsComponent,
    BlogListComponent
  ],
  imports: [
    CommonModule,
    NurseryModuleRoutingModule,
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class NurseryModuleModule {
  constructor() {
    console.log("Nursery Module Runnig");
  }
}
