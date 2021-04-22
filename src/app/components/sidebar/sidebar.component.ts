import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Panel de inicio",
    rtlTitle: "Panel de inicio",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/clients",
    title: "Clientes",
    rtlTitle: "Clientes",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/users",
    title: "Usuarios",
    rtlTitle: "Usuarios",
    icon: "icon-badge",
    class: ""
  },
  {
    path: "/forms",
    title: "Encuestas",
    rtlTitle: "Encuestas",
    icon: "icon-paper",
    class: ""
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
