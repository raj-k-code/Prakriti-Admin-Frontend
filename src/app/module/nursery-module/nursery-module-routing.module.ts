import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseryGuardService } from 'src/app/service/nursery-guard.service';
import { HomeComponent } from '../nursery-module/component/home/home.component';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { DefaultComponent } from './component/default/default.component';
import { GardenerListComponent } from './component/gardener-list/gardener-list.component';
import { GardenerProfileComponent } from './component/gardener-profile/gardener-profile.component';
import { GardenerComponent } from './component/gardener/gardener.component';
import { OrdersHistoryComponent } from './component/orders-history/orders-history.component';
import { ViewProductComponent } from './component/view-product/view-product.component';
import { ViewProfileComponent } from './component/view-profile/view-profile.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [NurseryGuardService],
    children: [
      {
        path: "",
        component: DefaultComponent,
        canActivate: [NurseryGuardService]
      },
      {
        path: "product-list",
        component: ViewProductComponent,
        canActivate: [NurseryGuardService]
      },
      {
        path: "gardener-list",
        component: GardenerListComponent,
        canActivate: [NurseryGuardService]
      },
      {
        path: "gardener",
        component: GardenerComponent,
        canActivate: [NurseryGuardService]
      },
      {
        path: "gardener/gardener-profile/:id",
        component: GardenerProfileComponent,
      },
      {
        path: "view-profile",
        component: ViewProfileComponent,
        canActivate: [NurseryGuardService]
      },
      {
        path: "contact-us",
        component: ContactUsComponent,
        canActivate: [NurseryGuardService]
      },
      {
        path: "blog-list",
        component: BlogListComponent,
        canActivate: [NurseryGuardService]
      },
      {
        path: "order-history",
        component: OrdersHistoryComponent,
        canActivate: [NurseryGuardService]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseryModuleRoutingModule { }
