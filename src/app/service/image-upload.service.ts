import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const IMAGE_API = 'http://localhost:8080/api/image/'

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  getImageUser():Observable<any>{
    return this.http.get(IMAGE_API + 'profileImage');
  }

  getImageByUserId(userId: number):Observable<any>{
    return this.http.get(IMAGE_API + userId + '/user');
  }

  getImageByMovieId(movieId: number | undefined):Observable<any>{
    return this.http.get(IMAGE_API + movieId + '/movie1');
  }

  getImageByMovieTitle(title: string):Observable<any>{
    return this.http.get(IMAGE_API + title + '/movie2');
  }

  uploadImageToUser(file: File):Observable<any>{
    const data = new FormData();
    data.append('file', file);

    return this.http.post(IMAGE_API + 'upload', data);
  }

  uploadImageToMovie(file: File, movieId: number):Observable<any>{
    const data = new FormData();
    data.append('file', file);

    return this.http.post(IMAGE_API + movieId + '/upload', data);
  }
}
