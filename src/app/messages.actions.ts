import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "./store";
import { Router } from "@angular/router";
import { ApiMessagesService } from "./services/api-messages.service";
import { Message } from "./entities/message";

@Injectable({ providedIn: "root" })
export class MessageActions {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private api: ApiMessagesService,
    private router: Router
  ) {}

  static MESSAGE_POST_SUCCESS: string = "MESSAGE_POST_SUCCESS";
  static MESSAGE_POST_LOADING: string = "MESSAGE_POST_LOADING";
  static MESSAGE_POST_FAILURE: string = "MESSAGE_POST_FAILURE";

  static MESSAGE_DELETE_SUCCESS: string = "MESSAGE_DELETE_SUCCESS";
  static MESSAGE_DELETE_LOADING: string = "MESSAGE_DELETE_LOADING";
  static MESSAGE_DELETE_FAILURE: string = "MESSAGE_DELETE_FAILURE";

  static MESSAGES_GET_SUCCESS: string = "GET_MESSAGES_SUCCESS";
  static MESSAGES_GET_LOADING: string = "GET_MESSAGES_LOADING";
  static MESSAGES_GET_FAILURE: string = "GET_MESSAGES_FAILURE";

  static MESSAGE_EDIT_SUCCESS: string = "MESSAGE_EDIT_SUCCESS";
  static MESSAGE_EDIT_LOADING: string = "MESSAGE_EDIT_LOADING";
  static MESSAGE_EDIT_FAILURE: string = "MESSAGE_EDIT_FAILURE";

  static MESSAGE_LIKE_SUCCESS: string = "MESSAGE_LIKE_SUCCESS";
  static MESSAGE_LIKE_LOADING: string = "MESSAGE_LIKE_LOADING";
  static MESSAGE_LIKE_FAILURE: string = "MESSAGE_LIKE_FAILURE";

  static MESSAGE_DISLIKE_SUCCESS: string = "MESSAGE_DISLIKE_SUCCESS";
  static MESSAGE_DISLIKE_LOADING: string = "MESSAGE_DISLIKE_LOADING";
  static MESSAGE_DISLIKE_FAILURE: string = "MESSAGE_DISLIKE_FAILURE";

  postMessage(message: Message): void {
    this.ngRedux.dispatch({
      type: MessageActions.MESSAGE_POST_LOADING
    });
    message.selector = "aboard-message";
    this.api.createMessage(message).subscribe(
      result => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_POST_SUCCESS,
          payload: result
        });
      },
      error => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_POST_FAILURE,
          payload: error
        });
      }
    );
  }

  getMessages() {
    this.ngRedux.dispatch({ type: MessageActions.MESSAGES_GET_LOADING });

    this.api.getMessages().subscribe(
      result => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGES_GET_SUCCESS,
          payload: result
            .filter(message => message.selector === "aboard-message")
            .reverse()
        });
      },
      error => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGES_GET_FAILURE,
          payload: error
        });
      }
    );
  }

  editMessage(message: Message) {
    this.ngRedux.dispatch({ type: MessageActions.MESSAGE_EDIT_LOADING });

    this.api.updateMessage(message).subscribe(
      () => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_EDIT_SUCCESS,
          payload: message
        });
      },
      error => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_EDIT_FAILURE,
          payload: error
        });
      }
    );
  }

  deleteMessage(messageId: String) {
    this.ngRedux.dispatch({ type: MessageActions.MESSAGE_DELETE_LOADING });

    this.api.deleteMessage(messageId).subscribe(
      id => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_DELETE_SUCCESS,
          payload: messageId
        });
      },
      error => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_DELETE_FAILURE,
          payload: error
        });
      }
    );
  }

  likeMessage(message: Message) {
    this.ngRedux.dispatch({
      type: MessageActions.MESSAGE_LIKE_LOADING
    });
    this.api.likeMessage(message).subscribe(
      result => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_LIKE_SUCCESS,
          payload: message
        });
      },
      error => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_LIKE_FAILURE,
          payload: error
        });
      }
    );
  }
  dislikeMessage(message: Message) {
    this.ngRedux.dispatch({
      type: MessageActions.MESSAGE_DISLIKE_LOADING
    });

    this.api.dislikeMessage(message).subscribe(
      result => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_DISLIKE_SUCCESS,
          payload: message
        });
      },
      error => {
        this.ngRedux.dispatch({
          type: MessageActions.MESSAGE_DISLIKE_FAILURE,
          payload: error
        });
      }
    );
  }
}
