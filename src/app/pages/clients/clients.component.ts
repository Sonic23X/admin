import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Client } from "../../interfaces/client";

const CLIENTS: Client[] =
[
  {
    nombre: 'asdasd',
    created: '2020/04/20',
    edad: 20,
    correo: 'asd@asd.com',
    genero: 'hombre',
    estado_civil: 'En una relacion',
    pais: 'Mexico',
    estado: 'Hidalgo',
    test: 2,
  },
];

function search(text: string, pipe: PipeTransform ): Client[] 
{
  return CLIENTS.filter(client => 
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

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.component.html',
  providers: [DecimalPipe],
})
export class ClientsComponent implements OnInit 
{

  filter = new FormControl('');
  clients$: Observable<Client[]>; //Este es el arreglo que debe contener a los usuarios al buscar

  constructor( pipe: DecimalPipe ) 
  {
    this.clients$ = this.filter.valueChanges.pipe
    (
      startWith(''),
      map( text => search(text, pipe) )
    );
  }

  ngOnInit(): void {
  }

}
