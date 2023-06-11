import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";
import {ImageUploadService} from "../../service/image-upload.service";
import {InviteService} from "../../service/invite.service";
import {coerceStringArray} from "@angular/cdk/coercion";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit{
  sentInvite: boolean = false;
  comeInvite: boolean = false;
  alreadyFriend: boolean = false;

  user !: User
  currentUser!: User;
  idUser = Number(this.route.snapshot.paramMap.get('idUser'))

  constructor(private route:ActivatedRoute,
              private imageService:ImageUploadService,
              private userService: UserService,
              private inviteService: InviteService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
      if(this.currentUser.id == this.idUser){
        this.router.navigateByUrl('/profile')
      }
      this.userService.getUserById(this.idUser).subscribe(data => {
        this.user = data;
        this.imageService.getImageByUserId(this.idUser).subscribe(data => {
          this.user.image = data.imageBytes;
        });
        this.checkFriends();
        this.checkInvite();
      })
    })
  }

  checkFriends(){
    this.userService.existFriends(this.currentUser.id, this.idUser).subscribe(data => {
      this.alreadyFriend = data;
    })
  }

  checkInvite(){
    this.inviteService.existInvite(this.idUser, this.currentUser.id).subscribe(data => {
      this.comeInvite = data;
      if(!data){
        this.inviteService.existInvite(this.currentUser.id, this.idUser).subscribe(data => {
          this.sentInvite = data;
        })
      }
      }
    )
  }

  invite(){
    this.inviteService.createInvite(this.currentUser.id, this.idUser).subscribe(data => {
      window.location.reload();
    })
  }

  cancel(){
    this.inviteService.actionInvite(this.currentUser.id, this.idUser, true).subscribe(data => {
      window.location.reload();
    })
  }

  accept(){
    this.inviteService.actionInvite(this.idUser, this.currentUser.id, true).subscribe(data => {
      window.location.reload();
    })
  }

  noAccept(){
    this.inviteService.actionInvite(this.idUser, this.currentUser.id, false).subscribe(data => {
      window.location.reload();
    })
  }

  deleteFriend(){

  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}
