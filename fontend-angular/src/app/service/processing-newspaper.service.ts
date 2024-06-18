import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessingNewspaperService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) { }

  public getAllProcessingNewspaperDateCreate(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/processing_newspaper/all_date_create`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getAllProcessingNewspaperToDateCreateAndConfirmIsNot(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/processing_newspaper/all_date_create_and_not_confirm`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getAllProcessingNewspaperToDateCreateAndConfirmAndNotCooking(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/processing_newspaper/all_date_create_and_confirm_and_not_cooking`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getAllProcessingNewspaperToDateCreateAndConfirmAndCooking(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/processing_newspaper/all_date_create_and_confirm_and_cooking`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public confirmProcessingNewspaper(id: number): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/processing_newspaper/confirm/${id}`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public cookingProcessingNewspaper(id: number): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/processing_newspaper/cooking/${id}`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public cancelProcessingNewspaper(id: number): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/processing_newspaper/cancel/${id}`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

}
