import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { ClientService } from "../../services/client.service";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
})
export class ClientDetailsComponent implements OnInit 
{

  name: String = '';
  email: String = '';
  age: String = '';
  dateCreated: String = '';
  gender: String = '';
  status: String = '';
  country: String = '';
  state: String = '';

  quizes = [];

  constructor
  ( 
    private clientService: ClientService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router,
  ) 
  { }

  ngOnInit(): void 
  {
    if (this.clientService.getUserSaved() != null) 
    {
      this.getClient(); 
    }
    else
      this.route.navigate(['clients']);
  }

  getClient(): void
  {    
    this.clientService.getClientInfo().subscribe(response => 
    {
      this.clientService.searchClients
      (
        response.email
      ).subscribe(response => 
      {
        this.name = response[0].usuario.usuario;
        this.dateCreated = response[0].usuario.createAt == null ? 'N/A': response[0].usuario.createAt;
        this.age = response[0].usuario.edad;
        this.email = response[0].usuario.email;
        this.gender = response[0].usuario.genero;
        this.status = response[0].usuario.estadoCivil;
        this.country = response[0].usuario.idPais;
        this.state = response[0].usuario.idEstado;
      });

      this.clientService.getClientQuizz
      (
        response.id
      ).subscribe(response => 
      {
        response.forEach(element => 
        {
          this.quizes.push
          (
            {
              quiz: element.idQuiz,
              created: element.createAt.split('T')[0]
            }
          );
        });
      });
      
    }, err =>
    {
      switch (err.status) 
      {
        case 401:
          this.alert('Tiempo de sesión expirado, inicie sesión de nuevo');
          this.authService.setToken('');
          this.route.navigate(['login']);
          break;
        default:
          this.alert('Error en el Servidor, por favor intente más tarde');
          break;
      }
    });
  }

  alert( text: String ): void
  {
    this.toastr.info(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${text}`, 
      '', 
      {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        positionClass: 'toast-bottom-center',
      }
    );
  }

}
