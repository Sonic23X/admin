import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { ClientsComponent } from './pages/clients/clients.component';
import { UsersComponent } from './pages/users/users.component';
import { FormsComponent } from './pages/forms/forms.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { ClientDetailsComponent } from './pages/client-details/client-details.component';
import { LoginComponent } from './pages/login/login.component';
import { UserUpdateComponent } from './pages/user-update/user-update.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, ClientsComponent, UsersComponent, FormsComponent, NewUserComponent, ClientDetailsComponent, LoginComponent, UserUpdateComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
