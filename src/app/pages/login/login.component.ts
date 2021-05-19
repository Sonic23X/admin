import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{

  user: String = '';
  password: String = '';

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private route: Router, 
  ) { }

  ngOnInit(): void {
  }

  login(): void
  {
    if ( this.user == '' || this.password == '' ) 
    {
      this.alert('Los campos son obligatorios');
    }

    this.authService.login(this.user, this.password).subscribe( response => 
    {
      this.authService.setName(this.user);
      this.authService.setToken(response.access_token);
      this.route.navigate(['/dashboard']);
    }, err =>
    {
      switch (err.status) 
      {
        case 400:
          this.alert('El usuario y/o contraseña no son válidos');
          break;
        case 401:
          this.alert('El usuario y/o contraseña no son válidos');
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
