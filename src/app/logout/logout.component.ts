import { Component, OnInit } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "../store";
import { UsersActions } from "../users.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {
  constructor(private ngRedux: NgRedux<AppState>, private router: Router) {}

  ngOnInit() {
    this.ngRedux.dispatch({
      type: UsersActions.USER_LOGOUT_SUCCESS
    });
    this.router.navigate(["/home"]);
  }
}
