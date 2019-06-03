import { UserVM } from "./user";

export class Message {
  _id: String;
  title: String;
  content: String;
  selector: String;
  user: UserVM;
  date: Date;
  image?: String;
  likes: String[];
  dislikes: String[];
}

