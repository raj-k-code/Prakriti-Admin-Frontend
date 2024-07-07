import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gardener } from '../model/gardener';

@Injectable({
  providedIn: 'root'
})
export class GardenerService {

  constructor(private http: HttpClient) { }

  public blockGardener(id: any) {
    let blockGardenerPi = "http://localhost:3000/gardener/block-gardener";
    return this.http.post<any>(blockGardenerPi, { gardenerId: id });
  }

  public unBlockGardener(id: any) {
    let unBlockGardenerApi = "http://localhost:3000/gardener/unblock-gardener";
    return this.http.post<any>(unBlockGardenerApi, { gardenerId: id });
  }

  public gardenerList(): Observable<Gardener[]> {
    let gardenerListApi = "http://localhost:3000/admin/gardener/gardener-list"
    return this.http.get<Gardener[]>(gardenerListApi);
  }


  public bookTheGardener(gardenerId: string) {
    let bookTheGardenerApi = "http://localhost:3000/gardener/book-gardener"
    return this.http.post<any>(bookTheGardenerApi, { nurseryId: sessionStorage.getItem('userId'), gardenerId: gardenerId });
  }

  public viewProfile(id: any): Observable<Gardener> {
    let viewProfileApi = "http://localhost:3000/gardener/gardner-by-id/" + id;
    return this.http.get<Gardener>(viewProfileApi);
  }

}
