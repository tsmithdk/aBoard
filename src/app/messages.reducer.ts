import { tassign } from "tassign";
import { MessageState } from "./store";
import { MessageActions } from "./messages.actions";

// State at startup.
const INITIAL_STATE: MessageState = {
  messages: [],
  isLoading: false
};

export function messagesReducer(
  state: MessageState = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case MessageActions.MESSAGES_GET_SUCCESS:
      return tassign(state, {
        messages: action.payload,
        isLoading: false
      });

    case MessageActions.MESSAGE_POST_SUCCESS:
      let newMessage = [...state.messages, action.payload];
      let newState = tassign(state, { messages: newMessage, isLoading: false });
      return newState;

    case MessageActions.MESSAGE_EDIT_SUCCESS:
      const foundMessageIndex = state.messages.findIndex(
        x => x._id === action.payload._id
      );
      const copiedMessages = [...state.messages];
      copiedMessages[foundMessageIndex] = action.payload;
      let newUpdatedState = tassign(state, {
        messages: copiedMessages,
        isLoading: false
      });
      return newUpdatedState;

    case MessageActions.MESSAGE_DELETE_SUCCESS:
      let newMessagesAfterDelete = state.messages.filter(
        message => message._id !== action.payload
      );
      return tassign(state, {
        messages: newMessagesAfterDelete,
        isLoading: false
      });

    case MessageActions.MESSAGE_LIKE_SUCCESS:
      const foundMessageLikeIndex = state.messages.findIndex(
        x => x._id === action.payload._id
      );

      const copiedMessagesForLikes = [...state.messages];
      copiedMessagesForLikes[foundMessageLikeIndex] = action.payload;
      let newUpdatedStateForLikes = tassign(state, {
        messages: copiedMessagesForLikes,
        isLoading: false
      });
      return newUpdatedStateForLikes;

    case MessageActions.MESSAGE_DISLIKE_SUCCESS:
      const foundMessageDislikeIndex = state.messages.findIndex(
        x => x._id === action.payload._id
      );
      const copiedMessagesForDislikes = [...state.messages];
      copiedMessagesForDislikes[foundMessageDislikeIndex] = action.payload;
      let newUpdatedStateForDislikes = tassign(state, {
        messages: copiedMessagesForDislikes,
        isLoading: false
      });
      return newUpdatedStateForDislikes;

    case MessageActions.MESSAGES_GET_LOADING:
    case MessageActions.MESSAGE_POST_LOADING:
    case MessageActions.MESSAGE_EDIT_LOADING:
    case MessageActions.MESSAGE_DELETE_LOADING:
    case MessageActions.MESSAGE_LIKE_LOADING:
    case MessageActions.MESSAGE_DISLIKE_LOADING:
      return tassign(state, {
        isLoading: true
      });

    case MessageActions.MESSAGES_GET_FAILURE:
    case MessageActions.MESSAGE_POST_FAILURE:
    case MessageActions.MESSAGE_DELETE_FAILURE:
    case MessageActions.MESSAGE_EDIT_FAILURE:
    case MessageActions.MESSAGE_LIKE_FAILURE:
    case MessageActions.MESSAGE_DISLIKE_FAILURE:
      return tassign(state, {
        isLoading: true
      });
    default:
      return state;
  }
}
