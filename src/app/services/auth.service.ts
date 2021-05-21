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
  private name: string;

  setToken(access_token: string):void 
  {
    this.token = access_token;
    sessionStorage.setItem('token', this.token);
  }

  setName(name: string):void 
  {
    this.name = name;
    sessionStorage.setItem('name', name);
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

  getName(): string
  {
    if(this.name != null)
      return this.name;
    else if(sessionStorage.getItem('name') != null)
    {
      this.name = sessionStorage.getItem('name') as string;
      return this.name;
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
