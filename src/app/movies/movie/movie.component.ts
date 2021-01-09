import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { GenreService } from '../services/genre.service';
import { Movie } from '../models/movie.model';
import { Genre } from '../models/genre.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movies: Observable<Movie[]>;
  moviesFilter: Observable<Movie[]>;
  genres: Observable<Genre[]>;
  visibleGenres: number = 5;
  isActive: string = "";
  inputValue: string = "";

  constructor(private _movieService: MovieService, private _genreService: GenreService, private router: Router) { }

  ngOnInit(): void {
    this.movies = this._movieService.getMovies();
    this.moviesFilter = this.movies;
    this.genres = this._genreService.getGenres();
    this.onSort("recent");
  }

  onFilter(input: string) {
    this.inputValue = input;
    if (this.isActive != "") {
      this.moviesFilter = this.movies.pipe(
        map(data => data.filter(movie => movie.category.includes(this.isActive))),
        map(data => data.filter(movie => movie.title.toLowerCase().includes(input.toLowerCase())))
      );
    } else {
      this.moviesFilter = this.movies.pipe(
        map(data => data.filter(movie => movie.title.toLowerCase().includes(input.toLowerCase())))
      );
    }
  }

  filterGenre(g: Genre) {
    if (this.isActive == g.name) {
      this.isActive = "";
      this.moviesFilter = this.movies;
      this.onFilter(this.inputValue);
    }
    else {
      this.isActive = g.name;
      this.onFilter(this.inputValue);
    }
  }

  onSort(sortMethod: string) {
    if (sortMethod == "recent") {
      this.movies = this.movies.pipe(
        map(data => data.sort(function(a, b) {
          if(a.id < b.id) return 1;
          if(a.id > b.id) return -1;
          return 0;
        }))
      );
    } else if (sortMethod == "a") {
      this.movies = this.movies.pipe(
        map(data => data.sort(function(a, b) {
          if(a.title < b.title) return -1;
          if(a.title > b.title) return 1;
          return 0;
        }))
      );
    } else {
      this.movies = this.movies.pipe(
        map(data => data.sort(function(a, b) {
          if(a.title < b.title) return 1;
          if(a.title > b.title) return -1;
          return 0;
        }))
      );
    }
    this.onFilter(this.inputValue);
  }

  public createImgPath(imagePath: string) {
    return "https://image.tmdb.org/t/p/w500/" + imagePath + ".jpg";
  }

  navigateMovie(m: Movie) {
    this.router.navigate(['/movie'], { queryParams: { title: m.title }});
  }
}