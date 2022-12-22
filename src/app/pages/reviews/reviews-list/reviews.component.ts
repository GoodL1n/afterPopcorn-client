import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {Review} from "../../../models/Review";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/User";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{

  reviews!:Review[];
  idMovie = Number(this.route.snapshot.paramMap.get('idMovie'));
  user!:User;

  constructor(private reviewService:ReviewService,
              private route:ActivatedRoute,
              private userService:UserService) {
  }

  ngOnInit(): void {
    this.reviewService.getReviewMovie(this.idMovie)
      .subscribe(data =>{
        this.reviews = data;
        for (let i = 0; i < this.reviews.length; i++) {
          this.userService.getUserById(this.reviews[i].user_id).subscribe(data => {
            this.user = data;
            this.reviews[i].nickname = this.user.nickname;
          })
        }
    });
  }

}
