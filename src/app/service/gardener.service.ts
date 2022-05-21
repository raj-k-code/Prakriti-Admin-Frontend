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
    let blockGardenerPi = "https://prakritee.herokuapp.com/gardener/block-gardener";
    return this.http.post<any>(blockGardenerPi, { gardenerId: id });
  }

  public unBlockGardener(id: any) {
    let unBlockGardenerApi = "https://prakritee.herokuapp.com/gardener/unblock-gardener";
    return this.http.post<any>(unBlockGardenerApi, { gardenerId: id });
  }

  public gardenerList(): Observable<Gardener[]> {
    let gardenerListApi = "https://prakritee.herokuapp.com/admin/gardener/gardener-list"
    return this.http.get<Gardener[]>(gardenerListApi);
  }


  public bookTheGardener(gardenerId: string) {
    let bookTheGardenerApi = "https://prakritee.herokuapp.com/gardener/book-gardener"
    return this.http.post<any>(bookTheGardenerApi, { nurseryId: sessionStorage.getItem('userId'), gardenerId: gardenerId });
  }

}
