import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "../store";
import { MessageActions } from "../messages.actions";
import { Message } from "../entities/message";
import { User, UserVM } from "../entities/user";

@Component({
  selector: "app-insert-message",
  templateUrl: "./insert-message.component.html",
  styleUrls: ["./insert-message.component.scss"]
})
export class InsertMessageComponent implements OnInit {
  messageForm: FormGroup;
  user: UserVM;
  constructor(
    private fb: FormBuilder,
    private messageActions: MessageActions,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit() {
    this.messageForm = this.fb.group({
      title: [
        "",
        [Validators.required, Validators.minLength(5), Validators.maxLength(25)]
      ],
      content: ["", [Validators.required, Validators.minLength(5)]],
      image: [
        "",
        [Validators.required, Validators.minLength(5), Validators.maxLength(25)]
      ]
    });

    this.ngRedux
      .select(x => x.user.loggedInUser)
      .subscribe(user => {
        if (user) {
          this.user = {
            _id: user._id,
            username: user.username
          };
        }
      });
  }

  onSubmit() {
    const newMessage = {
      ...this.messageForm.value,
      date: new Date(),
      likes: [],
      dislikes: [],
      user: this.user
    } as Message;

    this.messageActions.postMessage(newMessage);
    this.messageForm.value;
  }
}
