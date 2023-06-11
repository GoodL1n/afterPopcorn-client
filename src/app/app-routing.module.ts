import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {MoviesComponent} from "./pages/movies/movies.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {MoviePageComponent} from "./pages/movie-page/movie-page.component";
import {ReviewsComponent} from "./pages/reviews/reviews-list/reviews.component";
import {ReviewAddComponent} from "./pages/reviews/review-add/review-add.component";
import {UserComponent} from "./pages/profile/user/user.component";
import {UserReviewsComponent} from "./pages/profile/user-reviews/user-reviews.component";
import {MovieAddComponent} from "./pages/admin/movie-add/movie-add.component";
import {MovieListComponent} from "./pages/admin/movie-list/movie-list.component";
import {PublicProfileComponent} from "./pages/public-profile/public-profile.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'movies', component: MoviesComponent, canActivate: [AuthGuardService]},
  {path: 'movie/:idMovie', component: MoviePageComponent, canActivate: [AuthGuardService], children: [
    {path: '', component: ReviewsComponent, canActivate: [AuthGuardService]}]},
  {path: 'movie/:idMovie/reviews-list', component: ReviewsComponent, canActivate: [AuthGuardService], children:[
    {path: '', component: ReviewAddComponent, canActivate: [AuthGuardService]}]},
  {path: 'profile', component: UserComponent, canActivate: [AuthGuardService], children:[
      {path: '', component: UserReviewsComponent, canActivate: [AuthGuardService]}
    ]},
  {path: 'profile/:idUser', component: PublicProfileComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: MovieAddComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: MovieListComponent, canActivate: [AuthGuardService]}
    ]},
  {path: '**', redirectTo: 'movies'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
