import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/Review";

const REVIEW_API = 'http://localhost:8080/api/review/'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviewById(id:number):Observable<any>{
    return this.http.get(REVIEW_API + id);
  }

  getReviewUser():Observable<any>{
    return this.http.get(REVIEW_API + 'user');
  }

  getReviewMovie(id:number):Observable<any>{
    return this.http.get(REVIEW_API + 'movie/' + id);
  }

  createReview(review: Review, movieId: number):Observable<any>{
    return this.http.post(REVIEW_API + movieId + '/create', review);
  }

  likeReview(id: number, username: string):Observable<any>{
    return this.http.post(REVIEW_API + id + '/' + username + '/like', null);
  }

  deleteReview(idReview: number): Observable<any>{
    return this.http.delete(REVIEW_API + idReview + '/delete');
  }
}
