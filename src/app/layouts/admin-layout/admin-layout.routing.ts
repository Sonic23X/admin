import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
//import { UserComponent } from "../../pages/user/user.component";
//import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ClientsComponent } from "../../pages/clients/clients.component";
import { UsersComponent } from "../../pages/users/users.component";
import { NewUserComponent } from "../../pages/new-user/new-user.component";
import { UserUpdateComponent } from "../../pages/user-update/user-update.component";
import { FormsComponent } from "../../pages/forms/forms.component";
import { ClientDetailsComponent } from "../../pages/client-details/client-details.component";
import { AuthGuard } from "../../guards/auth.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  //{ path: "icons", component: IconsComponent },
  //{ path: "notifications", component: NotificationsComponent },
  //{ path: "user", component: UserComponent },
  //{ path: "tables", component: TablesComponent },
  //{ path: "typography", component: TypographyComponent },
  
  { path: "clients", component: ClientsComponent, canActivate: [AuthGuard] },
  { path: "clients/details", component: ClientDetailsComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "users/new", component: NewUserComponent, canActivate: [AuthGuard] },
  { path: "users/update", component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: "forms", component: FormsComponent, canActivate: [AuthGuard]},
];
