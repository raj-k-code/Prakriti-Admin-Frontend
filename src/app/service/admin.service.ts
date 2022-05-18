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
    let signInApi = "http://localhost:3000/admin/signin";
    return this.http.post<any>(signInApi, { email: admin.email, password: admin.password });
  }

  public signinWithGoogle(email: any) {
    let signinWithGoogleApi = "http://localhost:3000/admin/signin-with-google";
    return this.http.post<any>(signinWithGoogleApi, { email: email });
  }

  public forgotPassword(email: any) {
    let signInApi = "http://localhost:3000/admin/forgot-password";
    return this.http.post<any>(signInApi, { email: email });
  }

  public categoryList() {
    let categoryListApi = "http://localhost:3000/admin/category/category-list";
    return this.http.get<any>(categoryListApi);
  }

  public addCategory(category: FormData) {
    let addCategoryApi = "http://localhost:3000/admin/category/add";
    return this.http.post<any>(addCategoryApi, category);
  }

  public deleteCategory(categeryId: any) {
    let deleteCategoryApi = "http://localhost:3000/admin/category/delete";
    return this.http.post<any>(deleteCategoryApi, { categeryId: categeryId });
  }

  public editCategory(category: FormData) {
    let editCategoryApi = "http://localhost:3000/admin/category/edit";
    return this.http.post<any>(editCategoryApi, category);
  }



}
