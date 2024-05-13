import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) { }

  public login(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.url}/api-login/login`,
      data,
      {
        observe: "response",
      }
    );
  }

  public logout(token: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.url}/api-login/logout`,
      {
        token: token
      },
      {
        observe: "response",
      }
    );
  }

  public refreshToken(token: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.url}/api-login/refreshToken`,
      {
        token: token
      },
      {
        observe: "response",
      }
    );
  }

  public getUserProfile(accessToken: string): Observable<HttpResponse<any>> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('Authorization', 'Bearer ' + accessToken);
    return this.http.get<HttpResponse<any>>(
      `${this.url}/user/profile`,
      {
        headers: header,
        observe: "response",
      }
    );
  }
}
