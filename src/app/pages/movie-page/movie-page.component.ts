import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../service/movie.service";
import {Movie} from "../../models/Movie";
import {ImageUploadService} from "../../service/image-upload.service";
import {ReviewService} from "../../service/review.service";
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";
import {RatingService} from "../../service/rating.service";
import {Rating} from "../../models/Rating";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit{

  movie!:Movie;
  user!:User;
  rate!:Rating;
  isRating = false;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  idMovie = Number(this.route.snapshot.paramMap.get('idMovie'));

  constructor(private route:ActivatedRoute,
              private router: Router,
              private movieService: MovieService,
              private imageService: ImageUploadService,
              private reviewService: ReviewService,
              private userService: UserService,
              private ratingService: RatingService,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.ratingService.getRate(this.idMovie, this.user.id).subscribe(data => {
        this.rate = data;
        if(this.rate.stars!=0) this.isRating = true;
      });
    })
    this.movieService.getMovieById(this.idMovie).subscribe(data=>{
        this.movie = data;
        this.getImageToMovie(this.movie);
        this.ratingService.getAverageRate(this.movie.idMovie).subscribe(data =>{
          this.movie.averageRate = data;
        });
    });
    this.reviewService.getReviewMovie(this.idMovie).subscribe(data=>{
      this.movie.reviews=data;
    });
  }
  getImageToMovie(movie: Movie):void{
    this.imageService.getImageByMovieId(this.idMovie)
        .subscribe(data=>{
          movie.image=data.imageBytes;
        });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  //star rating

  countStar(star:any) {
    this.selectedValue = star;
    this.rate.stars = star;
    this.ratingService.editRate(this.rate).subscribe( () =>{
      this.notification.showSnackbar("???????????? ????????????????????");
    });
    window.location.reload();
  }

  addClass(star:any) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i;
      // @ts-ignore
      document.getElementById(ab).classList.add("selected");
    }
  }
  removeClass(star:any) {
    let ab = "";
    for (let i = star-1; i >= this.selectedValue; i--) {
      ab = "starId" + i;
      // @ts-ignore
      document.getElementById(ab).classList.remove("selected");
    }
  }

  editRating():void{
    this.isRating = false;
    this.rate.stars = 0;
    this.ratingService.editRate(this.rate).subscribe( () =>{
      this.notification.showSnackbar("???????????? ??????????????");
    });
    window.location.reload();
  }
}
