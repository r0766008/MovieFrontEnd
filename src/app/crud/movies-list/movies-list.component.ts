import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movies/models/movie.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MovieService } from '../../movies/services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies: Observable<Movie[]>;

  constructor(private _movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.movies = this._movieService.getMovies();
  }

  goToCreate() {
    this.router.navigate(['movies/create']);
  }

  editMovie(movie: Movie) {
    this.router.navigate(['movies/edit'], { queryParams: { title: movie.title }});
  }

  deleteMovie(movie: Movie) {
    this._movieService.deleteMovie(movie.imdbID).subscribe(res => {
      this.ngOnInit();
    });
  }
}
