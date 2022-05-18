import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public blockUser(id: any) {
    let blockUserApi = "http://localhost:3000/user/block-user";
    return this.http.post<any>(blockUserApi, { userId: id });
  }

  public unBlockUser(id: any) {
    let unBlockUserApi = "http://localhost:3000/user/unblock-user";
    return this.http.post<any>(unBlockUserApi, { userId: id });
  }

  public userList(): Observable<User[]> {
    let userListApi = "http://localhost:3000/admin/user/user-list"
    return this.http.get<User[]>(userListApi);
  }

  // public viewProfile(userId: any): Observable<User> {
  //   let viewProfileApi = "http://localhost:3000/admin/user/user-by-id/" + userId
  //   return this.http.get<User>(viewProfileApi);
  // }
}
