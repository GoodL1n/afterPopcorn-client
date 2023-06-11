import {Component, OnInit} from '@angular/core';
import {RatingService} from "../../../service/rating.service";
import {MovieService} from "../../../service/movie.service";
import {Rating} from "../../../models/Rating";

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css']
})
export class UserRatingComponent implements OnInit{

  rating: Rating[] = [];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private ratingService: RatingService,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.ratingService.getRatingCurrentUser().subscribe(data => {
        this.rating = data
        this.rating.forEach(r => {
          this.movieService.getMovieById(r.movie_rate_id).subscribe(data => {
            r.movie_name = data.title;
          })
        })
    })
  }

}
