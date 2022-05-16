import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './component/default/default.component';
import { HomesComponent } from './component/homes/homes.component';
import { UserComponent } from './component/user/user.component';

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
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
