import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { UsersActions } from "../users.actions";
import { User } from "../entities/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userActions: UsersActions
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [
        "thomas",
        [Validators.required, Validators.minLength(3), Validators.maxLength(25)]
      ],
      password: ["thomas123", [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    var sUsername: String = this.loginForm.value.username;
    var sPassword: String = this.loginForm.value.password;
    this.loginForm.value.password, "loginForm value";
    this.userActions.login(sUsername, sPassword);
    this.snackBar.open("One second, logging in..", "Close", {
      duration: 2000
    });
  }
}
