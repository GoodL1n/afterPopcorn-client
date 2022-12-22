import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";
import {ImageUploadService} from "../../service/image-upload.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  user!: User;
  isLoggedIn = false;
  isDataLoaded = false;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private imageService: ImageUploadService,
              private router: Router) {
  }

  logOut():void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if(this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        });
    }
  }
}
