import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../models/Movie";

const MOVIE_API = 'http://localhost:8080/api/movie/'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovieById(id: number): Observable<any>{
    return this.http.get(MOVIE_API + id);
  }

  getListOfMovies(): Observable<any>{
    return this.http.get(MOVIE_API + 'list');
  }

  getListOfMoviesByGenre(genre: string): Observable<any>{
    return this.http.get(MOVIE_API + 'list/' + genre);
  }

  createMovie(movie: Movie): Observable<any>{
    return this.http.post(MOVIE_API + 'create', movie);
  }

  updateMovie(movie: Movie, id: number): Observable<any>{
    return this.http.post(MOVIE_API + id + '/update', movie);
  }

  deleteMovie(id: number): Observable<any>{
    return this.http.post(MOVIE_API + id + '/delete', null);
  }
}
