import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nursury } from '../model/nursury';

@Injectable({
  providedIn: 'root'
})
export class NurseryService {

  constructor(private http: HttpClient) { }

  public nursuryList(): Observable<Nursury[]> {
    let nursuryListApi = "http://localhost:3000/admin/nursery/nursery-list";
    return this.http.get<Nursury[]>(nursuryListApi);
  }

  public blockNursery(id: any) {
    let blockNurseryApi = "http://localhost:3000/nurseryowner/block-nursery";
    return this.http.post<any>(blockNurseryApi, { nurseryownerId: id });
  }


  public unBlockNursery(id: any) {
    let unBlockNurseryApi = "http://localhost:3000/nurseryowner/unblock-nursery";
    return this.http.post<any>(unBlockNurseryApi, { nurseryownerId: id });
  }

  public viewProductList(nurseryOwnerId: any): Observable<any> {
    let viewProductListApi = "http://localhost:3000/product/product-list-by-nurseryowner";
    return this.http.post<any>(viewProductListApi, { nurseryOwnerId: nurseryOwnerId });
  }

  public productById(productId: any): Observable<any> {
    let productByIdApi = "http://localhost:3000/product/product-by-id/" + productId;
    return this.http.get<any>(productByIdApi);
  }

  public nursuryRequest(): Observable<Nursury[]> {
    let nursuryRequestApi = "http://localhost:3000/nurseryowner/nursery-request";
    return this.http.get<Nursury[]>(nursuryRequestApi);
  }

  public nursuryRequestApprove(nurseryId: any, nurseryEmail: any): Observable<any> {
    let nursuryRequestApproveApi = "http://localhost:3000/nurseryowner/nursery-request-approve";
    return this.http.post<any>(nursuryRequestApproveApi, { nurseryownerId: nurseryId, nurseryOwnerEmail: nurseryEmail });
  }

  public nursuryRequestCancel(nurseryId: any, nurseryEmail: any): Observable<any> {
    let nursuryRequestCancelApi = "http://localhost:3000/nurseryowner/nursery-request-cancel";
    return this.http.post<any>(nursuryRequestCancelApi, { nurseryownerId: nurseryId, nurseryOwnerEmail: nurseryEmail });
  }
}
