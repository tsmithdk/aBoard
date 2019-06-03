import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "./store";
import { User } from "./entities/user";
import { ApiUsersService } from "./services/api-users.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

@Injectable({ providedIn: "root" })
export class UsersActions {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private api: ApiUsersService,
    private router: Router,
    private authService: AuthService
  ) {}

  static USERS_GET_SUCCESS: string = "USERS_GET_SUCCESS";
  static USERS_GET_LOADING: string = "USERS_GET_LOADING";
  static USERS_GET_FAILURE: string = "USERS_GET_FAILURE";

  static USER_REGISTER_SUCCESS: string = "USER_REGISTER_SUCCESS";
  static USER_REGISTER_LOADING: string = "USER_REGISTER_LOADING";
  static USER_REGISTER_FAILURE: string = "USER_REGISTER_FAILURE";

  static USER_LOGIN_SUCCESS: string = "USER_LOGIN_SUCCESS";
  static USER_LOGIN_LOADING: string = "USER_LOGIN_LOADING";
  static USER_LOGIN_FAILURE: string = "USER_LOGIN_FAILURE";

  static USER_LOGOUT_SUCCESS: string = "USER_LOGOUT_SUCCESS";
  static USER_LOGOUT_LOADING: string = "USER_LOGOUT_LOADING";
  static USER_LOGOUT_FAILURE: string = "USER_LOGOUT_FAILURE";

  getUsers(): void {
    this.api.getUsers().subscribe(
      result => {
        this.ngRedux.dispatch({
          type: UsersActions.USERS_GET_LOADING
        });
        const users: User[] = result.filter(x => x.selector === "aboard-user");
        this.ngRedux.dispatch({
          type: UsersActions.USERS_GET_SUCCESS,
          payload: { users }
        });
      },
      error => {
        this.ngRedux.dispatch({
          type: UsersActions.USER_LOGIN_FAILURE,
          payload: error
        });
      }
    );
  }

  register(user: User): void {
    this.ngRedux.dispatch({
      type: UsersActions.USER_REGISTER_LOADING
    });
    user.selector = "aboard-user";
    this.api.registerUser(user).subscribe(
      result => {
        this.ngRedux.dispatch({
          type: UsersActions.USER_REGISTER_SUCCESS,
          payload: result
        });
        this.router.navigate(["/users/login"]);
      },
      error => {
        this.ngRedux.dispatch({
          type: UsersActions.USER_REGISTER_FAILURE,
          payload: error
        });
      }
    );
  }

  login(username: String, password: String): void {
    this.ngRedux.dispatch({
      type: UsersActions.USER_LOGIN_LOADING
    });

    this.api.getUsers().subscribe(
      result => {
        const loggedInUser: User = result.find(
          x =>
            x.selector === "aboard-user" &&
            x.username === username &&
            x.password === password
        );
        if (loggedInUser) {
          this.ngRedux.dispatch({
            type: UsersActions.USER_LOGIN_SUCCESS,
            payload: { loggedInUser }
          });
          const nextUrl = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : "/home";
          this.router.navigate([nextUrl]);
        } else {
          this.ngRedux.dispatch({
            type: UsersActions.USER_LOGIN_FAILURE,
            payload: { users: [], loggedInUser: null }
          });
        }
      },
      error => {
        this.ngRedux.dispatch({
          type: UsersActions.USER_LOGIN_FAILURE,
          payload: error
        });
      }
    );
  }

  logout(): void {
    this.ngRedux.dispatch({
      type: UsersActions.USER_LOGOUT_SUCCESS
    });
  }
}
