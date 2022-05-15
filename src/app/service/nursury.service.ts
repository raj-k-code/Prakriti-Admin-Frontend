import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nursury } from '../model/nursury';
@Injectable({
  providedIn: 'root'
})
export class NursuryService {

  constructor(private http:HttpClient) { }
  public signIn(nursury : Nursury) {
    let signInApi = "http://localhost:3000/nurseryowner/signin";
    return this.http.post<any>(signInApi, { nurseryOwnerEmail:nursury.nurseryOwnerEmail, password: nursury.nurseryOwnerPassword });
  }
}
