import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Admin} from '../model/admin'
import { Gardener } from '../model/gardener';
import { Nursury } from '../model/nursury';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) {  }
  public signIn(admin: Admin) {
    let signInApi = "http://localhost:3000/admin/signin";
    return this.http.post<any>(signInApi, { email: admin.email, password: admin.password });
  }

 
  public gardenerList(): Observable<Gardener[]> {
    let gardenerListApi = "http://localhost:3000/gardener/gardener-list"
    return this.http.get<Gardener[]>(gardenerListApi);
  }

  public nursuryList():Observable<Nursury[]>{
    let nursuryListApi = "http://localhost:3000/nurseryowner/nursery-list";
    return this.http.get<Nursury[]>(nursuryListApi);
  }



}
