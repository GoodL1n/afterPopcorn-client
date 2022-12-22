import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/auth/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signup(user: { nickname: any; password: any; confirmPassword: any; }):Observable<any>{
    return this.http.post(AUTH_API + 'signup', {
      nickname: user.nickname,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }

  public login(user: { nickname: string; password: string; }): Observable<any>{
    return this.http.post(AUTH_API + 'login', {
      nickname: user.nickname,
      password: user.password
    });
  }
}
