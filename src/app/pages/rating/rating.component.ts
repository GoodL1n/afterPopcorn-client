import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "../../service/rating.service";
import {UserService} from "../../service/user.service";
import {Rating} from "../../models/Rating";
import {ImageUploadService} from "../../service/image-upload.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{

  idMovie = Number(this.route.snapshot.paramMap.get('idMovie'));
  rating: Rating[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private rateService: RatingService,
              private userService: UserService,
              private imageService: ImageUploadService) {
  }

  ngOnInit(): void {
    this.rateService.getRating(this.idMovie).subscribe(data => {
      this.rating = data;
      for(let i = 0; i < this.rating.length; i++){
        this.userService.getUserById(this.rating[i].user_rate_id).subscribe(user =>{
          this.rating[i].user_name = user.nickname;
          this.imageService.getImageByUserId(this.rating[i].user_rate_id).subscribe(image => {
            this.rating[i].user_image = image.imageBytes;
          })
        })
      }
    })
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
