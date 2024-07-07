import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  public sendQuery(queryData: any) {
    let sendQueryApi = "http://localhost:3000/query/add"
    return this.http.post<any>(sendQueryApi, queryData);
  }
  public queryList() {
    let queryListApi = "http://localhost:3000/query/query-list"
    return this.http.get<any>(queryListApi);
  }

  public deleteQuery(queryId: any, email: any) {
    let deleteQueryApi = "http://localhost:3000/query/delete"
    return this.http.post<any>(deleteQueryApi, { queryId: queryId, email: email });
  }

  public sendResponse(email: any, message: any, queryId: any) {
    let sendResponseApi = "http://localhost:3000/query/response-query"
    return this.http.post<any>(sendResponseApi, { email: email, message: message, queryId: queryId });
  }
}
