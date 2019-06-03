import { MessageState } from "./store";
var deepFreeze = require("deep-freeze");
import { messagesReducer } from "./messages.reducer";
import * as types from "./messages.actions";
import { Message } from "./entities/message";
import { User } from "./entities/user";
// import { Gender } from "./entities/user";

describe("Messages reducer", () => {
  it("should return the initial state", () => {
    expect(messagesReducer(undefined, {})).toEqual({
      messages: [],
      isLoading: false
    } as MessageState);
  });

  //
  describe("Change loading state on action dispatch", () => {
    let stateBefore;
    beforeEach(function() {
      stateBefore = {
        messages: [],
        isLoading: false
      } as MessageState;
      deepFreeze(stateBefore);
    });
    it("when posting an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_POST_LOADING
      });
      expect(stateAfter).toEqual(response);
    });

    it("when deleting an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_DELETE_LOADING
      });
      expect(stateAfter).toEqual(response);
    });

    it("when getting messages", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGES_GET_LOADING
      });
      expect(stateAfter).toEqual(response);
    });
    it("when editing an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_EDIT_LOADING
      });
      expect(stateAfter).toEqual(response);
    });
    it("when liking an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_LIKE_LOADING
      });
      expect(stateAfter).toEqual(response);
    });
    it("when disliking an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_DISLIKE_LOADING
      });
      expect(stateAfter).toEqual(response);
    });
  });

  describe("Change loading state on failure", () => {
    let stateBefore;
    beforeEach(function() {
      stateBefore = {
        messages: [],
        isLoading: false
      } as MessageState;
      deepFreeze(stateBefore);
    });
    it("when posting an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_POST_FAILURE
      });
      expect(stateAfter).toEqual(response);
    });

    it("when deleting an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_DELETE_FAILURE
      });
      expect(stateAfter).toEqual(response);
    });

    it("when getting messages", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGES_GET_FAILURE
      });
      expect(stateAfter).toEqual(response);
    });
    it("when editing an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_EDIT_FAILURE
      });
      expect(stateAfter).toEqual(response);
    });
    it("when liking an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_LIKE_FAILURE
      });
      expect(stateAfter).toEqual(response);
    });
    it("when disliking an message", () => {
      let stateAfter = { messages: [], isLoading: true } as MessageState;
      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGE_DISLIKE_FAILURE
      });
      expect(stateAfter).toEqual(response);
    });
  });

  describe("Message CRUD", () => {
    // GET A LIST OF MESSAGES
    it("should get all messages from api", () => {
      let stateBefore = { messages: [], isLoading: true } as MessageState;
      deepFreeze(stateBefore);

      let messages: Message[] = [
        {
          _id: "5cea89f1b10029d435b64e65",
          title: "hej",
          content: "paigepbegpib",
          image: "",
          user: {} as User,
          date: new Date("2018-01-01"),
          likes: [],
          dislikes: [],
          selector: "aboard-message"
        },
        {
          _id: "1c3a89f1b10029d435b64e22",
          title: "Msg",
          content: "paigepbegpib",
          image: "",
          user: {} as User,
          date: new Date("2018-01-01"),
          likes: [],
          dislikes: [],
          selector: "aboard-message"
        }
      ];

      let stateAfter: MessageState = { messages, isLoading: false };

      let response = messagesReducer(stateBefore, {
        type: types.MessageActions.MESSAGES_GET_SUCCESS,
        payload: messages
      });
      expect(stateAfter).toEqual(response);
    });

    it("should create a message", () => {
      const beforeState = {
        messages: [
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: true
      } as MessageState;

      deepFreeze(beforeState);
      const afterState = {
        messages: [
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          },
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "hej",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: false
      } as MessageState;

      let response = messagesReducer(beforeState, {
        type: types.MessageActions.MESSAGE_POST_SUCCESS,
        payload: {
          _id: "5cea89f1b10029d435b64e65",
          title: "hej",
          content: "paigepbegpib",
          image: "",
          user: {} as User,
          date: new Date("2018-01-01"),
          likes: [],
          dislikes: [],
          selector: "aboard-message"
        }
      });

      expect(afterState).toEqual(response);
    });

    it("should edit a message", () => {
      const beforeState = {
        messages: [
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          },
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "hej",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: true
      } as MessageState;

      deepFreeze(beforeState);
      const afterState = {
        messages: [
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          },
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "edited_hej",
            content: "edited_paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: false
      } as MessageState;

      let response = messagesReducer(beforeState, {
        type: types.MessageActions.MESSAGE_EDIT_SUCCESS,
        payload: {
          _id: "5cea89f1b10029d435b64e65",
          title: "edited_hej",
          content: "edited_paigepbegpib",
          image: "",
          user: {} as User,
          date: new Date("2018-01-01"),
          likes: [],
          dislikes: [],
          selector: "aboard-message"
        }
      });

      expect(afterState).toEqual(response);
    });

    it("should delete a message based on an id", () => {
      const beforeState = {
        messages: [
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "hej",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          },
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: true
      } as MessageState;

      deepFreeze(beforeState);
      const afterState = {
        messages: [
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "hej",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: false
      } as MessageState;

      let response = messagesReducer(beforeState, {
        type: types.MessageActions.MESSAGE_DELETE_SUCCESS,
        payload: "1c3a89f1b10029d435b64e22"
      });

      expect(afterState).toEqual(response);
    });

    it("should like a message", () => {
      const beforeState = {
        messages: [
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "hej",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          },
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: true
      } as MessageState;

      deepFreeze(beforeState);
      const afterState = {
        messages: [
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "hej",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: ["5cea89e5b10029d435b64e61"],
            dislikes: [],
            selector: "aboard-message"
          },
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: false
      } as MessageState;

      let response = messagesReducer(beforeState, {
        type: types.MessageActions.MESSAGE_LIKE_SUCCESS,
        payload: {
          _id: "5cea89f1b10029d435b64e65",
          title: "hej",
          content: "paigepbegpib",
          image: "",
          user: {} as User,
          date: new Date("2018-01-01"),
          likes: ["5cea89e5b10029d435b64e61"],
          dislikes: [],
          selector: "aboard-message"
        }
      });

      expect(afterState).toEqual(response);
    });

    it("should dislike a message", () => {
      const beforeState = {
        messages: [
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "hej",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          },
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          }
        ],
        isLoading: true
      } as MessageState;

      deepFreeze(beforeState);
      const afterState = {
        messages: [
          {
            _id: "5cea89f1b10029d435b64e65",
            title: "hej",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: [],
            selector: "aboard-message"
          },
          {
            _id: "1c3a89f1b10029d435b64e22",
            title: "Msg",
            content: "paigepbegpib",
            image: "",
            user: {} as User,
            date: new Date("2018-01-01"),
            likes: [],
            dislikes: ["5cea89e5b10029d435b64e61"],
            selector: "aboard-message"
          }
        ],
        isLoading: false
      } as MessageState;

      let response = messagesReducer(beforeState, {
        type: types.MessageActions.MESSAGE_DISLIKE_SUCCESS,
        payload: {
          _id: "1c3a89f1b10029d435b64e22",
          title: "Msg",
          content: "paigepbegpib",
          image: "",
          user: {} as User,
          date: new Date("2018-01-01"),
          likes: [],
          dislikes: ["5cea89e5b10029d435b64e61"],
          selector: "aboard-message"
        }
      });

      expect(afterState).toEqual(response);
    });
  });
});

//   it("should update a product object", () => {
//     let beforeState = {
//       products: [
//         { _id: "1", name: "Hair Brush" },
//         { _id: "2", name: "Nail conditioner" },
//         { _id: "3", name: "Nail psykologist" }
//       ]
//     } as MessageState;
//     deepFreeze(beforeState);

//     let afterState = {
//       products: [
//         { _id: "1", name: "Hair Brush" },
//         { _id: "2", name: "Nail conditioner" },
//         { _id: "3", name: "Nail polish" }
//       ]
//     } as MessageState;

//     let response = productsReducer(beforeState, {
//       type: types.ProductActions.UPDATE_PRODUCT,
//       payload: { _id: "3", name: "Nail polish" }
//     });

//     expect(afterState).toEqual(response);
//   });

//   it("should test slice", () => {
//     let array = ["hat", "cat", "sad", "dog"];
//     let pos = array.findIndex(x => x === "sad");
//     let array2 = [...array.slice(0, pos), "hi", ...array.slice(pos + 1)];

//     expect(array2).toEqual(["hat", "cat", "hi", "dog"]);
//   });
// });
