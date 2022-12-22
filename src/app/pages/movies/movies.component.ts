import {Component, OnInit} from '@angular/core';
import {Movie} from "../../models/Movie";
import {MovieService} from "../../service/movie.service";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {GenreService} from "../../service/genre.service";
import {Genre} from "../../models/Genre";
import {RatingService} from "../../service/rating.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{

  isGenreSel = false;
  movies!: Movie[];
  genres!:Genre[];

  constructor(private movieService: MovieService,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private genreService: GenreService,
              private ratingService: RatingService) {
  }

  ngOnInit(): void {
    this.genreService.getGenres()
      .subscribe(data => {
      this.genres = data;
    })
    this.movieService.getListOfMovies()
      .subscribe(data =>{
        this.movies = data;
        this.getImagesToMovies(this.movies);
        this.getRate(this.movies);
      });
  }

  onGenreSelected(genre:string): void {
    this.isGenreSel = true;
    this.movieService.getListOfMoviesByGenre(genre).subscribe(data =>{
      this.movies = data;
      this.getImagesToMovies(this.movies);
      this.getRate(this.movies);
    });
  }

  getRate(movies: Movie[]):void{
    movies.forEach(m=>{
      this.ratingService.getAverageRate(m.idMovie)
        .subscribe(data => {
          m.averageRate = data;
        });
    });
  }

  withoutGenres():void{
    window.location.reload();
  }

  getImagesToMovies(movies: Movie[]):void{
    movies.forEach(m=>{
      this.imageService.getImageByMovieTitle(m.title)
        .subscribe(data=>{
          m.image=data.imageBytes;
        });
    });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }


}
