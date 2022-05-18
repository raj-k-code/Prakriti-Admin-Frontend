import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../nursery-module/component/home/home.component';
import { DefaultComponent } from './component/default/default.component';
import { ProductComponent } from './component/product/product.component';
// import { ProductComponent } from './component/product/product.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: DefaultComponent
      },
      {
        path: "product-list",
        component: ProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseryModuleRoutingModule { }
