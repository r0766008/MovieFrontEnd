import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './crud/movies-list/movies-list.component';
import { MovieCreateComponent } from './crud/movie-create/movie-create.component';
import { CastDetailComponent } from './movies/cast-detail/cast-detail.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MovieEditComponent } from './crud/movie-edit/movie-edit.component';
import { CastEditComponent } from './crud/cast-edit/cast-edit.component';
import { CastCreateComponent } from './crud/cast-create/cast-create.component';


const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'movie', component: MovieDetailComponent },
  { path: 'cast', component: CastDetailComponent },
  { path: 'cast/create', component: CastCreateComponent },
  { path: 'cast/edit', component: CastEditComponent },
  { path: 'movies', component: MoviesListComponent },
  { path: 'movies/create', component: MovieCreateComponent },
  { path: 'movies/edit', component: MovieEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
