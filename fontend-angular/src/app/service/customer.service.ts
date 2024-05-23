import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) { }

  public getAllCustomer(): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/customer/all`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getCustomerId(id: number): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/customer/get/${id}`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public saveCustomer(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/customer/save`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }
}
