import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) { }

  public getAllEmployee(): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/employee/all`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public deleteEmployee(id: number): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.delete<HttpResponse<any>>(
      `${this.url}/employee/delete/${id}`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public saveEmployee(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/employee/save`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }
}
