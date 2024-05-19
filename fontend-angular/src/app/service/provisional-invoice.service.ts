import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvisionalInvoiceService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) { }

  public getAllProvisionalInvoice(): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/provisional_invoice/all`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getProvisionalInvoiceId(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/provisional_invoice/detail`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public saveProvisionalInvoice(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/provisional_invoice/save`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }
}
