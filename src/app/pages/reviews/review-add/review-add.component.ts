import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReviewService} from "../../../service/review.service";
import {ImageUploadService} from "../../../service/image-upload.service";
import {Review} from "../../../models/Review";
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/User";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent implements OnInit{

  reviewForm!: FormGroup;
  createdReview!:Review;
  user!: User;
  idMovie = Number(this.route.snapshot.paramMap.get('idMovie'));

  constructor(private reviewService: ReviewService,
              private notification: NotificationService,
              private userService: UserService,
              private fb: FormBuilder,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reviewForm = this.createReviewForm();
  }

  createReviewForm():FormGroup{
    return this.fb.group(
      {
        text: ['', Validators.compose([Validators.required])]
      });
  }

  submit():void{
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.reviewService.createReview({
        title: ' ',
        text: this.reviewForm.value.text,
        likes: 0,
        user_id: this.user.id,
        movie_id: this.idMovie
      }, this.idMovie).subscribe(data=>{
        this.notification.showSnackbar("Review created!");
        window.location.reload();
      })
    })
  }

}
