import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  public sendQuery(queryData: any) {
    let sendQueryApi = "https://prakritee.herokuapp.com/query/add"
    return this.http.post<any>(sendQueryApi, queryData);
  }
  public queryList() {
    let queryListApi = "https://prakritee.herokuapp.com/query/query-list"
    return this.http.get<any>(queryListApi);
  }

  public deleteQuery(queryId: any, email: any) {
    let deleteQueryApi = "https://prakritee.herokuapp.com/query/delete"
    return this.http.post<any>(deleteQueryApi, { queryId: queryId, email: email });
  }

  public sendResponse(email: any, message: any, queryId: any) {
    let sendResponseApi = "https://prakritee.herokuapp.com/query/response-query"
    return this.http.post<any>(sendResponseApi, { email: email, message: message, queryId: queryId });
  }
}
