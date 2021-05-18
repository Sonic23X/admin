import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from "../../interfaces/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit 
{
  data: String = '';

  users: User[] = [ ];
  
  filter = new FormControl('');
  users$: Observable<User[]>; 

  constructor
  (
    private userService: UserService,
    private toastr: ToastrService,
    private route: Router,
  ) 
  { }

  search(text: string ): User[] 
  {
    return this.users.filter(user => 
    {
      const term = text.toLowerCase();
      return user.nombre.toLowerCase().includes(term)
          || user.aPaterno.toLowerCase().includes(term)
          || user.aMaterno.toLowerCase().includes(term)
          || user.created.toLowerCase().includes(term);
    });
  }

  ngOnInit(): void { }

  searchUsers(): void
  {
    this.userService.getUsers(this.data).subscribe(response =>
    {
      this.users.push
      (
        {
          id: response.id,
          nombre: response.nombre,
          aPaterno: response.apellidoPaterno,
          aMaterno: response.apellidoMaterno,
          created: 'N/A',
          user: response.usuario,
        }
      );

      this.users$ = this.filter.valueChanges.pipe
      (
        startWith(''),
        map( text => this.search(text) )
      );
    }, err =>
    {
      
    });
  }

  editUser(user: String): void
  {
    this.userService.setUserSaved(user);
    this.route.navigate(['users/update']);
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
