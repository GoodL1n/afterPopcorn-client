import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProvider} from "./helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { ReviewsComponent } from './pages/reviews/reviews-list/reviews.component';
import { ReviewAddComponent } from './pages/reviews/review-add/review-add.component';
import { UserComponent } from './pages/profile/user/user.component';
import { UserReviewsComponent } from './pages/profile/user-reviews/user-reviews.component';
import { MovieAddComponent } from './pages/admin/movie-add/movie-add.component';
import { MovieListComponent } from './pages/admin/movie-list/movie-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicProfileComponent } from './pages/public-profile/public-profile.component';
import { RatingComponent } from './pages/rating/rating.component';
import { UserRatingComponent } from './pages/profile/user-rating/user-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    MoviesComponent,
    MoviePageComponent,
    ReviewsComponent,
    ReviewAddComponent,
    UserComponent,
    UserReviewsComponent,
    MovieAddComponent,
    MovieListComponent,
    PublicProfileComponent,
    RatingComponent,
    UserRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [authInterceptorProviders, authErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
