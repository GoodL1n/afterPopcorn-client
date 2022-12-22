import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
    private authService:AuthService,
    private tokenStorage:TokenStorageService,
    private notification: NotificationService,
    private router: Router,
    private fb: FormBuilder) {
    if(this.tokenStorage.getUser()){
      this.notification.showSnackbar("You are already authorized");
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup{
    return this.fb.group({
        nickname: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  submit():void {
    this.authService.login({
        nickname: this.loginForm.value.nickname,
        password: this.loginForm.value.password
      }).subscribe(data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);

      this.notification.showSnackbar("Successfully logged in");
      this.router.navigate(['/']);
      window.location.reload();
    }, error => {
        console.log(error);
        this.notification.showSnackbar("Login error");
      });
  }

}
