import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl: string = "http://localhost:8050/movies/";

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + "all/");
  }

  getMovie(title: string): Observable<Movie> {
    return this.http.get<Movie>(this.baseUrl + "movie/" + title);
  }

  addMovie(movie: Movie) {
    return this.http.post<Movie>(this.baseUrl, movie);
  }

  editMovie(movie: Movie) {
    return this.http.put<Movie>(this.baseUrl, movie);
  }

  deleteMovie(imdbID: string) {
    return this.http.delete<Movie>(this.baseUrl + "movie/" + imdbID);
  }
}
