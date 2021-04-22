import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
})
export class NewUserComponent implements OnInit 
{

  constructor
  (
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
