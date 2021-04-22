import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { User } from "../../interfaces/user";

const USERS: User[] = 
[
  {
    id: 1,
    nombre: 'David',
    aPaterno: 'Carmargo',
    aMaterno: 'Azuara',
    created: '2020/04/20',
  },
  {
    id: 2,
    nombre: 'Alfredo',
    aPaterno: 'Ortega',
    aMaterno: 'Ramirez',
    created: '2020/04/20',
  },
  
];

function search(text: string ): User[] 
{
  return USERS.filter(user => 
  {
    const term = text.toLowerCase();
    return user.nombre.toLowerCase().includes(term)
        || user.aPaterno.toLowerCase().includes(term)
        || user.aMaterno.toLowerCase().includes(term)
        || user.created.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit 
{
  
  filter = new FormControl('');
  users$: Observable<User[]>; //Este es el arreglo que debe contener a los usuarios al buscar

  constructor() 
  {
    this.users$ = this.filter.valueChanges.pipe
    (
      startWith(''),
      map( text => search(text) )
    );
  }

  ngOnInit(): void {
  }

}
