import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Quiz } from "../../interfaces/quiz";
import { QuizzService } from "../../services/quizz.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
})
export class FormsComponent implements OnInit 
{

  quizes: Quiz[] = [ ];

  filter = new FormControl('');
  quizes$: Observable<Quiz[]>; //Este es el arreglo que debe contener los quizz a buscar

  constructor
  ( 
    private quizzService: QuizzService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router,
  ) 
  { }

  search(text: string ): Quiz[] 
  {
    return this.quizes.filter(quiz => 
    {
      const term = text.toLowerCase();
      return quiz.nombre.toLowerCase().includes(term)
          || quiz.created.toLowerCase().includes(term)
          || quiz.updated.toLowerCase().includes(term)
    });
  }

  ngOnInit(): void 
  {
    this.quizzService.getQuiz().subscribe(response => 
    {
      response.forEach(element => 
      {
        this.quizes.push({ nombre: element.name, created: element.createAt.split('T')[0], updated: element.createAt.split('T')[0] });
      });

      this.quizes$ = this.filter.valueChanges.pipe
      (
        startWith(''),
        map( text => this.search(text) )
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
