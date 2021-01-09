import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  baseUrl: string = "http://localhost:8050/genres/";

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.baseUrl + "all/");
  }

  getMoviesByGenre(genre: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + "genre/" + genre);
  }
}
