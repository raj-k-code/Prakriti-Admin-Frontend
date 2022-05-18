import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './component/category/category.component';
import { DefaultComponent } from './component/default/default.component';
import { GardenerComponent } from './component/gardener/gardener.component';
import { HomesComponent } from './component/homes/homes.component';
import { NurseryComponent } from './component/nursery/nursery.component';
import { UserComponent } from './component/user/user.component';
import { ViewProductComponent } from './component/view-product/view-product.component';

const routes: Routes = [
  {
    path: "",
    component: HomesComponent,
    children: [
      {
        path: "",
        component: DefaultComponent
      },
      {
        path: "user-list",
        component: UserComponent
      },
      {
        path: "gardener-list",
        component: GardenerComponent
      },
      {
        path: "nursery-list",
        component: NurseryComponent
      },
      {
        path: "nursery-list/product-list/:id",
        component: ViewProductComponent
      },
      {
        path: "category-list",
        component: CategoryComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
