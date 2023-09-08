import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeadersConfig, HttpParamsConfig } from "../interfaces/interfaces-api-service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  public get(apiName: string, url: string, params?: HttpParamsConfig, data?: any): Observable<any> {
    return this.request({method: 'GET', apiName: apiName, data: data, url: url, isExport: false, params: params});
  }

  public post(apiName: string, url: string, data?: any): Observable<any> {
    return this.request({method: 'POST', apiName: apiName, data: data, url: url},);
  }

  public put(apiName: string, url: string, data?: any): Observable<any> {
    return this.request({method: 'PUT', apiName: apiName, data: data, url: url});
  }

  public patch(apiName: string, url: string, data?: any): Observable<any> {
    return this.request({method: 'PATCH', apiName: apiName, data: data, url: url});
  }

  public delete(apiName: string, url: string, data?: any): Observable<any> {
    return this.request({method: 'DELETE', apiName: apiName, data: data, url: url});
  }

  public export(apiName: string, url: string, data?: any): Observable<any> {
    return this.request({method: 'POST', apiName: apiName, data: data, url: url, isExport: true});
  }

  private request(
      {
        method,
        apiName,
        data, url,
        isExport = false,
        params
      }: {
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
        apiName: string,
        data?: any,
        url: string,
        isExport?: boolean,
        params?: HttpParamsConfig
      }
  ): Observable<any> {

    const callUrl = this.buildUrl(apiName, url);
    const headers = new HttpHeaders(this.getHeaders());
    const options: any = { headers: headers };

    if (params) {
      options.params = params;
    }

    if (isExport) {
      options.observe = 'response';
      options.responseType = 'blob' as 'json';
    }

    switch (method) {
      case 'GET':
        return this.http.get(callUrl, options);
      case 'POST':
        return this.http.post(callUrl, JSON.stringify(data || {}), options);
      case 'PUT':
        return this.http.put(callUrl, JSON.stringify(data || {}), options);
      case 'PATCH':
        return this.http.patch(callUrl, JSON.stringify(data || {}), options);
      case 'DELETE':
        return this.http.delete(callUrl, options);
    }
  }

  private buildUrl(apiName: string, url: string): string {
    let callUrl: string = `${url}${apiName}`;
    return callUrl ?? '';
  }

  private getHeaders(): HttpHeadersConfig {
    const token = localStorage.getItem('token');
    let headers: HttpHeadersConfig = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }


}
