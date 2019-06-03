import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { UsersActions } from "../users.actions";
import { User } from "../entities/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userActions: UsersActions
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(25)]
      ],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    this.userActions.register(this.registerForm.value as User);
    this.snackBar.open("One second, logging in..", "Close", {
      duration: 2000
    });
  }
}
