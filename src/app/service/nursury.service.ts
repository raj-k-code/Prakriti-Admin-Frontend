import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nursury } from '../model/nursury';
@Injectable({
  providedIn: 'root'
})
export class NursuryService {

  constructor(private http: HttpClient) { }

  public signIn(nursury: Nursury) {
    let signInApi = "http://localhost:3000/nurseryowner/signin";
    return this.http.post<any>(signInApi, { nurseryOwnerEmail: nursury.nurseryOwnerEmail, nurseryOwnerPassword: nursury.nurseryOwnerPassword });
  }

  public signinWithGoogle(email: any) {
    let signinWithGoogleApi = "http://localhost:3000/nurseryowner/signin-with-google";
    return this.http.post<any>(signinWithGoogleApi, { nurseryOwnerEmail: email });
  }

  public forgotPassword(email: any) {
    let signInApi = "http://localhost:3000/nurseryowner/forgot-password";
    return this.http.post<any>(signInApi, { nurseryOwnerEmail: email });
  }
}
