import { Component, OnInit, Input } from "@angular/core";
import { MessageActions } from "../messages.actions";
import { AppState } from "../store";
import { NgRedux } from "@angular-redux/store";
import { Message } from "../entities/message";
import { User } from "../entities/user";

@Component({
  selector: "app-single-message",
  templateUrl: "./single-message.component.html",
  styleUrls: ["./single-message.component.scss"]
})
export class SingleMessageComponent implements OnInit {
  isEditing: boolean;
  @Input() msg: Message;
  @Input() user: User;
  editedMessage: Message;
  isMessageLiked: boolean;
  isMessageDisliked: boolean;
  constructor(private messageActions: MessageActions) {}

  ngOnInit() {
    this.isMessageLiked = this.user && this.msg.likes.includes(this.user._id);
    this.isMessageDisliked =
      this.user && this.msg.dislikes.includes(this.user._id);
  }

  likeMessage(userId: String) {
    const likes = [...this.msg.likes, userId];
    const dislikes = [...this.msg.dislikes].filter(x => x !== userId);
    const message = { ...this.msg, likes, dislikes };
    this.messageActions.likeMessage(message);
  }
  dislikeMessage(userId: String) {
    const likes = [...this.msg.likes].filter(x => x !== userId);
    const dislikes = [...this.msg.dislikes, userId];
    const message = { ...this.msg, dislikes, likes };
    this.messageActions.dislikeMessage(message);
  }

  editMessage() {
    // this.messageActions.deleteMessage(messageId);
    this.editedMessage = { ...this.msg };
    this.isEditing = true;
  }
  updateMessage(messageId: String) {
    this.isEditing = false;
    this.messageActions.editMessage(this.editedMessage);
  }
  deleteMessage(messageId: String) {
    this.messageActions.deleteMessage(messageId);
  }
}
