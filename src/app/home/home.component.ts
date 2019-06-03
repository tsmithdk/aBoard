import { Component, OnInit } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "../store";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  user = null;

  constructor(private ngRedux: NgRedux<AppState>) {}

  ngOnInit() {
    this.ngRedux
      .select(x => x.user.loggedInUser)
      .subscribe(user => {
        this.user = user;
      });
  }
}
