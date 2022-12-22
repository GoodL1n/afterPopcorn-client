import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  public regForm!: FormGroup;

  constructor( private authService: AuthService,
               private notification: NotificationService,
               private router: Router,
               private fb: FormBuilder,
               private tokenStorage: TokenStorageService){
    if(this.tokenStorage.getUser()){
      this.notification.showSnackbar("You are already authorized");
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.regForm=this.createRegForm();
  }

  createRegForm():FormGroup{
    return this.fb.group(
      {
        nickname: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.required])]
      });
  }

  submit():void{
    console.log(this.regForm.value);
    this.authService.signup({
        nickname:this.regForm.value.nickname,
        password:this.regForm.value.password,
        confirmPassword:this.regForm.value.confirmPassword
      }).subscribe(data =>{
        console.log(data);

        this.notification.showSnackbar("Registration successfully");
        this.router.navigate(['/login']);
      } , error => {
        console.log(error);
        this.notification.showSnackbar("Registration error");
      });
  }

}
