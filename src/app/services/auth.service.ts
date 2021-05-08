import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  constructor(private http:HttpClient) { }

  private token: string;

  setToken(access_token: string):void 
  {
    this.token = access_token;
    sessionStorage.setItem('token', this.token);
  }

  getToken(): string
  {
    if(this.token != null)
      return this.token;
    else if(sessionStorage.getItem('token') != null)
    {
      this.token = sessionStorage.getItem('token') as string;
      return this.token;
    }
    return '';
  }

  login(user, password): Observable<any>
  {
    const urlEndPoint = `${environment.apiUrl}psic-admin/oauth/token`;
    const credenciales = btoa('Web'+':'+'c77ScUTyW2jHTj');
    const httphHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Basic '+credenciales});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user);
    params.set('password', password);
    return this.http.post(urlEndPoint, params.toString(), {headers: httphHeaders});
  }  

}
