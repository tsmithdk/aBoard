import { NgRedux } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../store";
import { User } from "../entities/user";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  user: User;
  redirectUrl: string;
  constructor(
    private ngRedux: NgRedux<AppState>,
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.ngRedux
      .select(x => x.user.loggedInUser)
      .subscribe(user => {
        this.user = user;
      });

    if (this.user) {
      return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(["/users/login"]);
    return false; // Not allowed access.

    // this.router.navigate(['/home/login']);
    // return false; // Not allowed access.
  }
}
