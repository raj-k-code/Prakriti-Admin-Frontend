import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

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

  public deleteProduct(productId: any) {
    let deleteProductApi = "http://localhost:3000/product/delete-product";
    return this.http.post<any>(deleteProductApi, { productId: productId });
  }

  public addProduct(product: FormData) {
    let addProductApi = "http://localhost:3000/product/add-product";
    return this.http.post<any>(addProductApi, product);
  }

  public editProduct(product: FormData) {
    let editProductApi = "http://localhost:3000/product/edit-product";
    return this.http.post<any>(editProductApi, product);
  }
}
