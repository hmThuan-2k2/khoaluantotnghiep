import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) { }

  public getAllInvoice(): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/invoice/all`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getInvoiceId(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/invoice/detail`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public saveInvoice(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/invoice/save`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getAllInvoiceDateCreate(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/invoice/all_date_create`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }
}
