import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiServer;

  constructor(private http: HttpClient) { }

  public login(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/api-login/login`, data);
  }
}
