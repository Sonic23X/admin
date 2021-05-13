import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService 
{

  private urlEndPoint: string = `${environment.apiUrl}psis/api/usuarios`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  private userSaved: String = null;

  constructor
  (
    private http: HttpClient,
    private authService: AuthService,
  ) { }

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

  private agregarAuthorizationHeader(): any
  {
    let token = this.authService.getToken();
    if(token != null)
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    
    return this.httpHeaders;
  }

  getClients(): Observable<any>
  {
    return this.http.get
    (
      `${this.urlEndPoint}`, 
      {
        headers: this.agregarAuthorizationHeader()
      }
    );
  }

  searchClients
  (
    email: string, 
    dateStart: string = null, 
    dateEnd: string = null, 
    quizz: Number = null
  ): Observable<any>
  {
    return this.http.post
    (
      `${this.urlEndPoint}/obtenerUsuariosByParams`, 
      {
        email: email,
        fechaInicio: dateStart,
        fechaFin: dateEnd,
        idQuizz: quizz,
      },
      {
        headers: this.agregarAuthorizationHeader()
      }
    );
  }

  getClientInfo(): Observable<any>
  {
    return this.http.get
    (
      `${environment.apiUrl}psic-admin/api/usuarios/${this.getUserSaved()}`,
      {
        headers: this.agregarAuthorizationHeader()
      }
    );
  }

  getClientQuizz(idUser: Number): Observable<any>
  {
    return this.http.get
    (
      `${environment.apiUrl}psis/api/quiz-resultados/${idUser}`,
      {
        headers: this.agregarAuthorizationHeader()
      }
    );
  }
}
