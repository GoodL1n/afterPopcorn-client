import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie.service";
import {Movie} from "../../../models/Movie";
import {ImageUploadService} from "../../../service/image-upload.service";
import {NotificationService} from "../../../service/notification.service";
import {AdminService} from "../../../service/admin.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  movies!:Movie[];
  selectedFile!:File;
  displayedColumns: string[] = ['idMovie', 'title', 'actions', 'delete'];

  constructor(private movieService: MovieService,
              private adminService: AdminService,
              private imageService: ImageUploadService,
              private notification: NotificationService) {
  }
  ngOnInit(): void {
    this.movieService.getListOfMovies()
      .subscribe(data =>{
        console.log(data);
        this.movies = data;
      });
  }
  onFileSelected(event: any, idMovie: number): void {
    this.selectedFile = event.target.files[0];

    this.imageService.uploadImageToMovie(this.selectedFile, idMovie).subscribe(data => {
      this.notification.showSnackbar("Изображение загружено!");
    })
  }

  deleteMov(idMovie: number):void{
    this.adminService.deleteMovie(idMovie).subscribe(data => {
      this.notification.showSnackbar("Фильм удален");
      window.location.reload();
    },error => {
      this.notification.showSnackbar("У вас нет прав доступа!");
    });
  }
}
