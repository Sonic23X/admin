import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
})
export class NewUserComponent implements OnInit 
{

  name: String = '';
  user: String = '';
  aPaterno: String = '';
  aMaterno: String = '';
  email: String = '';
  phone: String = '';
  age: String = '';
  password: String = '';
  rpassword: String = '';

  constructor
  (
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router,
  ) { }

  ngOnInit(): void { }

  newUser(): void
  {
    if(this.password != this.rpassword)
    {
      this.alert('Las contraseñas no coinciden');
      return;
    }

    this.userService.newUser
    (
      this.user,
      this.name, 
      this.email, 
      this.phone, 
      this.age, 
      this.aPaterno, 
      this.aMaterno, 
      this.password
    ).subscribe(response =>
    {
      this.alert('¡Usuario creado con exito!');
      this.route.navigate(['users']);
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
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        positionClass: 'toast-bottom-center',
      }
    );
  }

}
