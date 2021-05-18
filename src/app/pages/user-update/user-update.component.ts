import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit 
{

  name: String = '';
  aPaterno: String = '';
  aMaterno: String = '';
  email: String = '';
  phone: String = '';
  age: String = '';

  constructor
  (
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router,
  ) 
  { }

  ngOnInit(): void 
  {
    if (this.userService.getUserSaved() != null) 
    {
      this.getUser();
    }
    else
      this.route.navigate(['users']);
  }

  getUser(): void
  {
    this.userService.getUsers(this.userService.getUserSaved()).subscribe(response =>
    {
      this.name = response.nombre;
      this.aPaterno = response.apellidoPaterno;
      this.aMaterno = response.apellidoMaterno;
      this.email = response.email;
      this.phone = response.telefono;
      this.age = response.edad;
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

  updateUser(): void
  {
    this.userService.updateUser(this.name, this.email, this.phone, this.age, this.aPaterno, this.aMaterno).subscribe(response =>
    {
      this.alert('¡Usuario actualizado con exito!');
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
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        positionClass: 'toast-bottom-center',
      }
    );
  }

}
