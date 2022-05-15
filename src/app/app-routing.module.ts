import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './deshboard/home/home.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path:'',component:SigninComponent },
  {path:"home" , component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
