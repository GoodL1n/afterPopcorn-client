import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const USER_API = 'http://localhost:8080/api/user/'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any>{
    return this.http.get(USER_API);
  }

  getUserById(id: number): Observable<any>{
    return this.http.get(USER_API + id);
  }

  updateUser(user: any): Observable<any>{
    return this.http.post(USER_API + 'update', user);
  }
}
