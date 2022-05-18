import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public viewProductList(nurseryOwnerId: any): Observable<any> {
    let viewProductListApi = "http://localhost:3000/product/product-list-by-nurseryowner";
    return this.http.post<any>(viewProductListApi, { nurseryOwnerId: nurseryOwnerId });
  }

  public productById(productId: any): Observable<any> {
    let productByIdApi = "http://localhost:3000/product/product-by-id/" + productId;
    return this.http.get<any>(productByIdApi);
  }

}
