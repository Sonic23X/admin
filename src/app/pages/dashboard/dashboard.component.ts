import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit 
{

  name: String = '';
  constructor(
    private authService: AuthService,
  ) 
  {
    this.name = this.authService.getName();
  }

  ngOnInit() { }
  
}
