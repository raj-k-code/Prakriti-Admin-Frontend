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
    let viewProductListApi = "https://prakritee.herokuapp.com/product/product-list-by-nurseryowner";
    return this.http.post<any>(viewProductListApi, { nurseryOwnerId: nurseryOwnerId });
  }

  public productById(productId: any): Observable<any> {
    let productByIdApi = "https://prakritee.herokuapp.com/product/product-by-id/" + productId;
    return this.http.get<any>(productByIdApi);
  }

  public deleteProduct(productId: any) {
    let deleteProductApi = "https://prakritee.herokuapp.com/product/delete-product";
    return this.http.post<any>(deleteProductApi, { productId: productId });
  }

  public addProduct(product: FormData) {
    let addProductApi = "https://prakritee.herokuapp.com/product/add-product";
    return this.http.post<any>(addProductApi, product);
  }

  public editProduct(product: FormData) {
    let editProductApi = "https://prakritee.herokuapp.com/product/edit-product";
    return this.http.post<any>(editProductApi, product);
  }
}
