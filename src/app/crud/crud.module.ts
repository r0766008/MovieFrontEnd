import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { SharedModule } from '../shared/shared.module';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CastEditComponent } from './cast-edit/cast-edit.component';
import { CastCreateComponent } from './cast-create/cast-create.component';



@NgModule({
  declarations: [MoviesListComponent, MovieCreateComponent, MovieEditComponent, CastEditComponent, CastCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CrudModule { }
