import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "../store";
import { MessageActions } from "../messages.actions";
import { Message } from "../entities/message";
import { User } from "../entities/user";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  user: User = undefined;
  isLoading = false;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private messageActions: MessageActions
  ) {}

  ngOnInit() {
    this.messageActions.getMessages();
    this.ngRedux
      .select(state => state)
      .subscribe(res => {
        this.user = res.user.loggedInUser;
        this.messages = res.messages.messages;
        this.isLoading = res.messages.isLoading;
      });
  }
}
