import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin'
import { Category } from '../model/category';
import { Gardener } from '../model/gardener';
import { Nursury } from '../model/nursury';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public signIn(admin: Admin) {
    let signInApi = "https://prakritee.herokuapp.com/admin/signin";
    return this.http.post<any>(signInApi, { email: admin.email, password: admin.password });
  }

  public signinWithGoogle(email: any) {
    let signinWithGoogleApi = "https://prakritee.herokuapp.com/admin/signin-with-google";
    return this.http.post<any>(signinWithGoogleApi, { email: email });
  }

  public forgotPassword(email: any) {
    let signInApi = "https://prakritee.herokuapp.com/admin/forgot-password";
    return this.http.post<any>(signInApi, { email: email });
  }

  public categoryList() {
    let categoryListApi = "https://prakritee.herokuapp.com/admin/category/category-list";
    return this.http.get<any>(categoryListApi);
  }

  public addCategory(category: FormData) {
    let addCategoryApi = "https://prakritee.herokuapp.com/admin/category/add";
    return this.http.post<any>(addCategoryApi, category);
  }

  public deleteCategory(categeryId: any) {
    let deleteCategoryApi = "https://prakritee.herokuapp.com/admin/category/delete";
    return this.http.post<any>(deleteCategoryApi, { categeryId: categeryId });
  }

  public editCategory(category: FormData) {
    let editCategoryApi = "https://prakritee.herokuapp.com/admin/category/edit";
    return this.http.post<any>(editCategoryApi, category);
  }



}
