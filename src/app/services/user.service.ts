import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  private urlEndPoint: string = `${environment.apiUrl}psis/api/usuarios`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor
  (
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  private agregarAuthorizationHeader()
  {
    let token = this.authService.getToken();
    if(token != null)
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    
    return this.httpHeaders;
  }

  getUsers(): Observable<any>
  {
    return this.http.get
    (
      `${this.urlEndPoint}`, 
      {
        headers: this.agregarAuthorizationHeader()
      }
    );
  }

  deleteUser(): Observable<any>
  {
    return this.http.delete
    (
      `${this.urlEndPoint}`, 
      {
        headers: this.agregarAuthorizationHeader()
      }
    );
  }
}
