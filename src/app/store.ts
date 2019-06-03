import { routerReducer } from "@angular-redux/router";
import { combineReducers } from "redux";
import { User } from "./entities/user";
import { usersReducer } from "./users.reducer";
import { Message } from "./entities/message";
import { messagesReducer } from "./messages.reducer";

export class UserState {
  users: User[];
  loggedInUser: User;
  isLoading: boolean;
}

export class MessageState {
  messages: Message[];
  isLoading: boolean;
}

export class AppState {
  user?: UserState;
  messages?: MessageState;
}

export const rootReducer = combineReducers<AppState>({
  user: usersReducer,
  messages: messagesReducer,
  router: routerReducer
} as any);
