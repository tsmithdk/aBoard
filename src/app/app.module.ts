import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";

import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDividerModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule
} from "@angular/material";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import {
  NgRedux,
  DevToolsExtension,
  NgReduxModule
} from "@angular-redux/store";
import { AppState, rootReducer } from "./store";
import { NgReduxRouter, NgReduxRouterModule } from "@angular-redux/router";
import { HttpClientModule } from "@angular/common/http";
import { MessagesComponent } from "./messages/messages.component";
import { InsertMessageComponent } from "./insert-message/insert-message.component";
import { SingleMessageComponent } from "./single-message/single-message.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MessagePipe } from "./message.pipe";
import { LogoutComponent } from "./logout/logout.component";
import { UsersComponent } from "./users/users.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MessagesComponent,
    InsertMessageComponent,
    SingleMessageComponent,
    UserProfileComponent,
    MessagePipe,
    LogoutComponent,
    UsersComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgReduxModule,
    HttpClientModule,
    NgReduxRouterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      {},
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

    ngReduxRouter.initialize(/* args */);
  }
}
