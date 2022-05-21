import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Nursury } from '../model/nursury';

@Injectable({
  providedIn: 'root'
})
export class NurseryService {

  constructor(private http: HttpClient) { }

  public nursuryList(): Observable<Nursury[]> {
    let nursuryListApi = "https://prakritee.herokuapp.com/admin/nursery/nursery-list";
    return this.http.get<Nursury[]>(nursuryListApi);
  }

  public blockNursery(id: any) {
    let blockNurseryApi = "https://prakritee.herokuapp.com/nurseryowner/block-nursery";
    return this.http.post<any>(blockNurseryApi, { nurseryownerId: id });
  }


  public unBlockNursery(id: any) {
    let unBlockNurseryApi = "https://prakritee.herokuapp.com/nurseryowner/unblock-nursery";
    return this.http.post<any>(unBlockNurseryApi, { nurseryownerId: id });
  }

  public viewProductList(nurseryOwnerId: any): Observable<any> {
    let viewProductListApi = "https://prakritee.herokuapp.com/product/product-list-by-nurseryowner";
    return this.http.post<any>(viewProductListApi, { nurseryOwnerId: nurseryOwnerId });
  }

  public productById(productId: any): Observable<any> {
    let productByIdApi = "https://prakritee.herokuapp.com/product/product-by-id/" + productId;
    return this.http.get<any>(productByIdApi);
  }

  public nursuryRequest(): Observable<Nursury[]> {
    let nursuryRequestApi = "https://prakritee.herokuapp.com/nurseryowner/nursery-request";
    return this.http.get<Nursury[]>(nursuryRequestApi);
  }

  public nursuryRequestApprove(nurseryId: any, nurseryEmail: any): Observable<any> {
    let nursuryRequestApproveApi = "https://prakritee.herokuapp.com/nurseryowner/nursery-request-approve";
    return this.http.post<any>(nursuryRequestApproveApi, { nurseryownerId: nurseryId, nurseryOwnerEmail: nurseryEmail });
  }

  public nursuryRequestCancel(nurseryId: any, nurseryEmail: any): Observable<any> {
    let nursuryRequestCancelApi = "https://prakritee.herokuapp.com/nurseryowner/nursery-request-cancel";
    return this.http.post<any>(nursuryRequestCancelApi, { nurseryownerId: nurseryId, nurseryOwnerEmail: nurseryEmail });
  }

  public viewOrderHistory(userId: any) {
    let viewOrderHistoryApi = "https://prakritee.herokuapp.com/order/view-order";
    return this.http.post(viewOrderHistoryApi, { userId: userId });
  }

  public viewProfile(nurseryId: any) {
    let viewProfileApi = "https://prakritee.herokuapp.com/nurseryowner/nursery-by-id/" + nurseryId;
    return this.http.get<Nursury>(viewProfileApi);
  }

  public updateProfile(nursery: FormData): Observable<any> {
    let updateProfileApi = "https://prakritee.herokuapp.com/nurseryowner/edit";
    return this.http.post<any>(updateProfileApi, nursery);
  }
}
