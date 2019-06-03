import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "../store";
import { User } from "../entities/user";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("id");
    this.ngRedux
      .select(x => x.user.users)
      .subscribe(users => {
        this.user = users.find(user => user._id === userId);
      });
  }
}
