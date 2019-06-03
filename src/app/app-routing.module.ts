import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { MessagesComponent } from "./messages/messages.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UsersComponent } from "./users/users.component";
import { AuthGuard } from "./auth/auth.guard";
import { LogoutComponent } from "./logout/logout.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  {
    path: "home",
    component: HomeComponent
  },

  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "logout", component: LogoutComponent },
      {
        path: "profile/:id",
        component: UserProfileComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: "messages", component: MessagesComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
