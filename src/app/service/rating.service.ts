import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rating} from "../models/Rating";

const RATE_API = 'http://localhost:8080/api/rating/';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {}

  getRating(idMovie: any):Observable<any>{
    return this.http.get(RATE_API + 'all/' + idMovie);
  }

  getRatingByUserId(userId: number):Observable<any>{
    return this.http.get(RATE_API + 'rating/' + userId);
  }

  getRatingCurrentUser():Observable<any>{
    return this.http.get(RATE_API + 'currentuser');
  }

  getAverageRate(idMovie: any):Observable<any> {
    return this.http.get(RATE_API + idMovie);
  }

  getRate(idMovie:number, idUser: number):Observable<any>{
    return this.http.get(RATE_API + idMovie + '/' + idUser);
  }

  editRate(rating: Rating):Observable<any>{
    return this.http.post(RATE_API + 'edit', rating);
  }
}
