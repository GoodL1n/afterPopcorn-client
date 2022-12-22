import {Component, OnInit} from '@angular/core';
import {Review} from "../../../models/Review";
import {ReviewService} from "../../../service/review.service";
import {NotificationService} from "../../../service/notification.service";
import {MovieService} from "../../../service/movie.service";
import {Movie} from "../../../models/Movie";

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit{

  reviews!:Review[];
  movie!:Movie;

  constructor(private reviewService: ReviewService,
              private movieService: MovieService,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.reviewService.getReviewUser().subscribe(data => {
      this.reviews = data;
      this.reviews.forEach(r => {
        this.movieService.getMovieById(r.movie_id).subscribe(dat => {
          this.movie = dat;
          r.movie_name = this.movie.title;
        })
      })
    })
  }

  deleteReview(id: any):void{
    this.reviewService.deleteReview(id).subscribe(data => {
      this.notification.showSnackbar("Review delete");
      window.location.reload();
    });
  }

}
