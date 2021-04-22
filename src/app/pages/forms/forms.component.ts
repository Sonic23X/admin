import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Quiz } from "../../interfaces/quiz";

const QUIZES: Quiz[] =
[
  {
    nombre: 'test 1',
    created: '2020/04/20',
    updated: '2020/04/20',
  },
];

function search(text: string ): Quiz[] 
{
  return QUIZES.filter(quiz => 
  {
    const term = text.toLowerCase();
    return quiz.nombre.toLowerCase().includes(term)
        || quiz.created.toLowerCase().includes(term)
        || quiz.updated.toLowerCase().includes(term)
  });
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
})
export class FormsComponent implements OnInit 
{

  filter = new FormControl('');
  quizes$: Observable<Quiz[]>; //Este es el arreglo que debe contener a los usuarios al buscar

  constructor( ) 
  {
    this.quizes$ = this.filter.valueChanges.pipe
    (
      startWith(''),
      map( text => search(text) )
    );
  }

  ngOnInit(): void {
  }

}
