import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../service/user.service";
import {ImageUploadService} from "../../../service/image-upload.service";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  user!:User;
  image!:File;
  selectedFile!:File;
  friends: User[] = [];
  reviewOpen: boolean = true;

  constructor(private userService:UserService,
              private imageService:ImageUploadService,
              private notification:NotificationService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.userService.getFriendsCurrentUser().subscribe(data =>{
        console.log(data)
        this.friends = data
        for(let i = 0; i < this.friends.length; i++){
          this.imageService.getImageByUserId(this.friends[i].id).subscribe(data => {
            this.friends[i].image = data.imageBytes;
          });
        }
        }
      )
      this.imageService.getImageUser().subscribe(data => {
        this.user.image = data.imageBytes;
      });
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.imageService.uploadImageToUser(this.selectedFile).subscribe(data => {
      window.location.reload();
      this.notification.showSnackbar("Image upload!");
    }, error => {
      this.notification.showSnackbar(error);
    })
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
