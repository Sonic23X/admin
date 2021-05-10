import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Client } from "../../interfaces/client";
import { ClientService } from "../../services/client.service";
import { AuthService } from "../../services/auth.service";
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.component.html',
  providers: [DecimalPipe],
})
export class ClientsComponent implements OnInit 
{

  clients: Client[] =[ ];
  quizes = [];

  filter = new FormControl('');
  clients$: Observable<Client[]>;

  constructor
  ( 
    private clientService: ClientService,
    private authService: AuthService,
    private quizzService: QuizzService,
    private toastr: ToastrService,
    private route: Router,
  ) 
  { }

  search(text: string, pipe: PipeTransform ): Client[] 
  {
    return this.clients.filter(client => 
    {
      const term = text.toLowerCase();
      return client.nombre.toLowerCase().includes(term)
          || client.created.toLowerCase().includes(term)
          || pipe.transform(client.edad).includes(term)
          || client.correo.toLowerCase().includes(term)
          || client.genero.toLowerCase().includes(term)
          || client.estado_civil.toLowerCase().includes(term)
          || client.pais.toLowerCase().includes(term)
          || client.estado.toLowerCase().includes(term)
          || pipe.transform(client.test).includes(term)
    });
  }

  ngOnInit(): void 
  {
    this.getClients();
    this.getQuizz();
  }

  getClients()
  {
    this.clientService.getClients().subscribe(response => 
      {
        console.log(response);
        
        response.forEach(element => 
        {
          this.clients.push(
          { 
            nombre: element.usuario,
            created: element.createAt == null ? 'N/A': element.createAt,
            edad: element.edad,
            correo: element.email,
            genero: element.genero,
            estado_civil: element.estadoCivil,
            pais: element.idPais,
            estado: element.idEstado,
            test: element.idQuizz == null ? 1 : element.idQuizz,
          });
        });
  
        let pipe: DecimalPipe;
  
        this.clients$ = this.filter.valueChanges.pipe
        (
          startWith(''),
          map( text => this.search(text, pipe) )
        );
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

  getQuizz()
  {
    this.quizzService.getQuiz().subscribe( response => 
    {
      response.forEach(element => {
        this.quizes.push({ id: element.id, name: element.name });
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
