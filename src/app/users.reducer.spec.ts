import { UserState } from "./store";
var deepFreeze = require("deep-freeze");
import { usersReducer } from "./users.reducer";
import * as types from "./users.actions";
import { User } from "./entities/user";
// import { Gender } from "./entities/user";

describe("users reducer", () => {
  it("should return the initial state", () => {
    expect(usersReducer(undefined, {})).toEqual({
      users: [],
      loggedInUser: undefined,
      isLoading: false
    } as UserState);
  });

  //
  describe("Change is loadings state on action dispatch", () => {
    let stateBefore;
    beforeEach(function() {
      stateBefore = {
        users: [],
        loggedInUser: null,
        isLoading: false
      } as UserState;
      deepFreeze(stateBefore);
    });
    it("when registering", () => {
      let stateAfter = { users: [], loggedInUser: null, isLoading: true };
      let response = usersReducer(stateBefore, {
        type: types.UsersActions.USER_REGISTER_LOADING
      });
      expect(stateAfter).toEqual(response);
    });
    it("when logging out", () => {
      let stateAfter = { users: [], loggedInUser: null, isLoading: true };
      let response = usersReducer(stateBefore, {
        type: types.UsersActions.USER_LOGOUT_LOADING
      });
      expect(stateAfter).toEqual(response);
    });

    it("when logging in", () => {
      let stateAfter = { users: [], loggedInUser: null, isLoading: true };
      let response = usersReducer(stateBefore, {
        type: types.UsersActions.USER_LOGIN_LOADING
      });
      expect(stateAfter).toEqual(response);
    });

    it("when getting users", () => {
      let stateAfter = { users: [], loggedInUser: null, isLoading: true };
      let response = usersReducer(stateBefore, {
        type: types.UsersActions.USERS_GET_LOADING
      });
      expect(stateAfter).toEqual(response);
    });
  });

  describe("registering", () => {
    it("successfull registration", () => {
      let stateBefore: UserState = { isLoading: true } as UserState;
      deepFreeze(stateBefore);

      let response = usersReducer(stateBefore, {
        type: types.UsersActions.USER_REGISTER_SUCCESS
      });

      let stateAfter: UserState = { isLoading: false } as UserState;
      expect(stateAfter).toEqual(response);
    });

    it("failed", () => {
      let stateBefore = { isLoading: true } as UserState;
      deepFreeze(stateBefore);

      let stateAfter = {
        isLoading: false
      };

      let response = usersReducer(stateBefore, {
        type: types.UsersActions.USER_REGISTER_FAILURE
      });
      expect(stateAfter).toEqual(response);
    });
  });

  // Create a test to check that your create functionality works AND
  // does not make state mutations
  it("should perform a successful login", () => {
    let stateBefore: UserState = { isLoading: true } as UserState;
    deepFreeze(stateBefore);

    let user: User = {
      _id: "5ce2bab7083b2480472c5026",
      username: "thomas",
      email: "thomas@thomas.com",
      password: "thomas123",
      selector: "aboard-user"
    };

    let stateAfter = {
      loggedInUser: user,
      isLoading: false
    };

    let response = usersReducer(stateBefore, {
      type: types.UsersActions.USER_LOGIN_SUCCESS,
      payload: { loggedInUser: user }
    });
    expect(stateAfter).toEqual(response);
  });

  it("should perform a unsuccessful login", () => {
    let stateBefore = { loggedInUser: null, isLoading: true } as UserState;
    deepFreeze(stateBefore);

    let stateAfter = {
      loggedInUser: null,
      isLoading: false
    };

    let response = usersReducer(stateBefore, {
      type: types.UsersActions.USER_LOGIN_FAILURE
    });
    expect(stateAfter).toEqual(response);
  });
  // GET A LIST OF USERS
  it("should get all users from api", () => {
    let stateBefore = {
      users: [],
      loggedInUser: null,
      isLoading: true
    } as UserState;
    deepFreeze(stateBefore);

    let users: User[] = [
      {
        _id: "5ce2bab7083b2480472c5026",
        username: "cami",
        email: "lla@is.dk",
        password: "random",
        selector: "aboard-user"
      },
      {
        _id: "5ce2bab7083b2480472c5026",
        username: "thomas",
        email: "thomas@thomas.com",
        password: "S3c1rrw",
        selector: "aboard-user"
      }
    ];

    let stateAfter = { users, loggedInUser: null, isLoading: false };

    let response = usersReducer(stateBefore, {
      type: types.UsersActions.USERS_GET_SUCCESS,
      payload: { users }
    });
    expect(stateAfter).toEqual(response);
  });

  it("failed to get users", () => {
    let stateBefore = { isLoading: true } as UserState;
    deepFreeze(stateBefore);

    let stateAfter = {
      isLoading: false
    };

    let response = usersReducer(stateBefore, {
      type: types.UsersActions.USERS_GET_FAILURE
    });
    expect(stateAfter).toEqual(response);
  });

  describe("logging out", () => {
    it("failed to logout", () => {
      let stateBefore = { isLoading: true } as UserState;
      deepFreeze(stateBefore);

      let stateAfter = {
        isLoading: false
      };

      let response = usersReducer(stateBefore, {
        type: types.UsersActions.USER_LOGOUT_FAILURE
      });
      expect(stateAfter).toEqual(response);
    });

    it("succeeded to logout", () => {
      let stateBefore = { isLoading: true } as UserState;
      deepFreeze(stateBefore);

      let stateAfter = {
        loggedInUser: null,
        isLoading: false
      };

      let response = usersReducer(stateBefore, {
        type: types.UsersActions.USER_LOGOUT_SUCCESS
      });
      expect(stateAfter).toEqual(response);
    });
  });
});
