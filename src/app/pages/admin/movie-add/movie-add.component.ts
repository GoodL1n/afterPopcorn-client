import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../service/notification.service";
import {AdminService} from "../../../service/admin.service";

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit{

  movieForm!:FormGroup;

  constructor(private adminService: AdminService,
              private notification: NotificationService,
              private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.movieForm = this.createMovieFb();
  }

  createMovieFb():FormGroup{
    return this.fb.group(
      {
        title: ['', Validators.compose([Validators.required])],
        textMini: ['', Validators.compose([Validators.required])],
        textLarge: ['', Validators.compose([Validators.required])],
      });
  }

  submit():void{
    this.adminService.createMovie({
      title: this.movieForm.value.title,
      textMini: this.movieForm.value.textMini,
      textLarge: this.movieForm.value.textLarge
    }).subscribe(data=>{
      this.notification.showSnackbar("Фильм успешно добавлен");
      window.location.reload();
    },error => {
      this.notification.showSnackbar("У вас нет прав доступа!");
    })
  }

}
