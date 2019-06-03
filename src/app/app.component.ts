import { Component, ChangeDetectorRef } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "./store";
import { UsersActions } from "./users.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "aBoard";
  user = null;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private userActions: UsersActions,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.ngRedux
      .select(x => x.user.loggedInUser)
      .subscribe(user => {
        this.user = user;
        // this.router.navigate(["/users/login"]);
        this.cd.detectChanges();
      });
    this.userActions.getUsers();
  }
}
