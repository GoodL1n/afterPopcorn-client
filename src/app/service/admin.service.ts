import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "../models/Movie";
import {Observable} from "rxjs";

const ADMIN_API = 'http://localhost:8080/api/admin/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createMovie(movie: Movie): Observable<any>{
    return this.http.post(ADMIN_API + 'createMovie', movie);
  }

  updateMovie(movie: Movie, idMovie: number): Observable<any>{
    return this.http.post(ADMIN_API + idMovie + '/updateMovie', movie);
  }

  deleteMovie(idMovie: number): Observable<any>{
    return this.http.delete(ADMIN_API + idMovie + '/deleteMovie');
  }
}
