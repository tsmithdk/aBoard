import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "../entities/message";
import { User } from "../entities/user";

@Injectable({
  providedIn: "root"
})
export class ApiMessagesService {
  baseUrl: string = "http://angular2api2.azurewebsites.net/api/internships";
  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    // Filter only customerId === 'cmll' should be used
    //this.message.customerId = "cMlL";
    return this.http.get(this.baseUrl) as Observable<Message[]>;
    //return undefined; //delete this line
  }
  createMessage(message: Message): Observable<any> {
    return this.http.post(this.baseUrl, message);
  }
  updateMessage(message: Message) {
    return this.http.put(this.baseUrl + "/" + message._id, message, {
      responseType: "text"
    });
    //client side filter the data: i can retreive only my own data.
  }
  deleteMessage(messageId: String) {
    return this.http.delete(this.baseUrl + "/" + messageId, {
      responseType: "text"
    });
  }
  likeMessage(message: Message) {
    return this.http.put(this.baseUrl + "/" + message._id, message, {
      responseType: "text"
    });
  }
  dislikeMessage(message: Message) {
    return this.http.put(this.baseUrl + "/" + message._id, message, {
      responseType: "text"
    });
  }
}
