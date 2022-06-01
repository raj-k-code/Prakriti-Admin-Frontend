import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from 'src/app/service/admin-guard.service';
import { CategoryComponent } from './component/category/category.component';
import { DefaultComponent } from './component/default/default.component';
import { GardenerComponent } from './component/gardener/gardener.component';
import { HomesComponent } from './component/homes/homes.component';
import { NurseryComponent } from './component/nursery/nursery.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { QueryListComponent } from './component/query-list/query-list.component';
import { UserComponent } from './component/user/user.component';
import { ViewOrderComponent } from './component/view-order/view-order.component';
import { ViewParticularOdorderComponent } from './component/view-particular-odorder/view-particular-odorder.component';
import { ViewProductComponent } from './component/view-product/view-product.component';

const routes: Routes = [
  {
    path: "",
    component: HomesComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: "",
        component: DefaultComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: "user-list",
        component: UserComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: "gardener-list",
        component: GardenerComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: "nursery-list",
        component: NurseryComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: "nursery-list/product-list/:id",
        component: ViewProductComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: "category-list",
        component: CategoryComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: "user-list/orders/:id",
        component: OrderHistoryComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: "query-list",
        component: QueryListComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: "all-orders",
        component: ViewOrderComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: "all-orders/view-order-by-id/:id",
        component: ViewParticularOdorderComponent,
        canActivate: [AdminGuardService]
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
