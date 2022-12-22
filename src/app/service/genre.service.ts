import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const GENRE_API = 'http://localhost:8080/api/genre/';

@Injectable({
  providedIn: 'root'
})

export class GenreService {

  constructor(private http: HttpClient) { }

  getGenreById(id:number):Observable<any>{
    return this.http.get(GENRE_API + id);
  }

  getGenres():Observable<any>{
    return this.http.get(GENRE_API + "list");
  }
}
