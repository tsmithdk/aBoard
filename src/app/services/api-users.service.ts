import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "../entities/message";
import { User } from "../entities/user";

@Injectable({
  providedIn: "root"
})
export class ApiUsersService {
  baseUrl: string = "http://angular2api2.azurewebsites.net/api/internships";
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get(this.baseUrl) as Observable<User[]>;
  }
  registerUser(user: User): Observable<User> {
    return this.http.post(this.baseUrl, user) as Observable<User>;
  }
}
