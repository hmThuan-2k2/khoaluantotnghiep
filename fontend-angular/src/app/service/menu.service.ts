import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) { }

  public saveMenu(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/menus/save`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getAllMenu(): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/menus/all`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getAllMenuFindIdMenuGroup(data: any): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.post<HttpResponse<any>>(
      `${this.url}/menus/all_find_menus_group`,
      data,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public getDetailMenuId(id: number): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/menus/detail?id=${id}`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  public deleteMenu(id: number): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    let accessToken: string = sessionStorage.getItem("accessToken");
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.delete<HttpResponse<any>>(
      `${this.url}/menus/delete/${id}`,
      {
        headers: header,
        observe: "response",
      }
    );
  }

  uploadSignature(value: any): Observable<any>{
    console.log(value);
    let data = value;
    return this.http.post('https://api.cloudinary.com/v1_1/dvdrvtda7/image/upload',data);
  }
}
