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

  userSaved: String = null;

  getUserSaved(): String
  {
    return this.userSaved;
  }

  setUserSaved(email: String): void
  {
    this.userSaved = email;
  }

  dropUserSaved(): void
  {
    this.userSaved = null;
  }

  private urlEndPoint: string = `${environment.apiUrl}psic-admin/api/usuarios`;
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

  getUsers(search: String): Observable<any>
  {
    return this.http.get
    (
      `${this.urlEndPoint}/${search}`, 
      {
        headers: this.agregarAuthorizationHeader()
      }
    );
  }

  newUser
  (
    user: String,
    name: String, 
    email: String, 
    phone: String,
    age: String,
    lastName1: String,
    lastName2: String,
    password: String,
  ): Observable<any>
  {
    return this.http.post
    (
      `${environment.apiUrl}psic-admin/api/usuarios/crear`,
      {
        usuario: user,
        email: email,
        telefono: phone,
        activo: true,
        edad: age,
        apellidoPaterno: lastName1,
        apellidoMaterno: lastName2,
        nombre: name,
        password: password,
        roles: ["ROLE_ADMIN", "ROLE_USER"]
      },
      {
        headers: this.agregarAuthorizationHeader()
      }
    );
  }

  updateUser
  (
    name: String, 
    email: String, 
    phone: String,
    age: String,
    lastName1: String,
    lastName2: String,
  ): Observable<any>
  {
    return this.http.put
    (
      `${environment.apiUrl}psic-admin/api/usuarios/${this.getUserSaved()}`,
      {
        usuario: this.getUserSaved(),
        email: email,
        telefono: phone,
        activo: true,
        edad: age,
        apellidoPaterno: lastName1,
        apellidoMaterno: lastName2,
        nombre: name,
        roles: ["ROLE_ADMIN", "ROLE_USER"]
      },
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
