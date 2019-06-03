import { tassign } from "tassign";
import { UserState } from "./store";
import { UsersActions } from "./users.actions";
import { User } from "./entities/user";

// State at startup.
const INITIAL_STATE: UserState = {
  users: [],
  isLoading: false,
  loggedInUser: undefined
};

export function usersReducer(state: UserState = INITIAL_STATE, action: any) {
  switch (action.type) {
    case UsersActions.USER_REGISTER_LOADING:
      return tassign(state, { isLoading: true });
    case UsersActions.USER_REGISTER_FAILURE:
      return tassign(state, { isLoading: false });
    case UsersActions.USER_REGISTER_SUCCESS:
      return tassign(state, { isLoading: false });
    case UsersActions.USER_LOGIN_FAILURE:
      return tassign(state, { isLoading: false });
    case UsersActions.USER_LOGIN_LOADING:
      return tassign(state, { isLoading: true });
    case UsersActions.USER_LOGIN_SUCCESS:
      return tassign(state, {
        loggedInUser: action.payload.loggedInUser,
        isLoading: false
      });
    case UsersActions.USERS_GET_LOADING:
      return tassign(state, { isLoading: true });
    case UsersActions.USERS_GET_FAILURE:
      return tassign(state, { isLoading: false });
    case UsersActions.USERS_GET_SUCCESS:
      return tassign(state, {
        users: action.payload.users,
        isLoading: false
      });
    case UsersActions.USER_LOGOUT_LOADING:
      return tassign(state, { isLoading: true });
    case UsersActions.USER_LOGOUT_FAILURE:
      return tassign(state, { isLoading: false });
    case UsersActions.USER_LOGOUT_SUCCESS:
      return tassign(state, {
        isLoading: false,
        loggedInUser: null
      } as UserState);
    default:
      return state;
  }
}
