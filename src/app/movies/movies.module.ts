import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from './services/movie.service';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GenreService } from './services/genre.service';
import { CastDetailComponent } from './cast-detail/cast-detail.component';

@NgModule({
  declarations: [MovieComponent, MovieDetailComponent, CastDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [MovieService, GenreService],
  exports: [
    MovieComponent,
    MovieDetailComponent
  ]
})
export class MoviesModule { }