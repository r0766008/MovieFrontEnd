import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cast } from '../models/cast.model';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  baseUrl: string = "http://localhost:8050/cast/";

  constructor(private http: HttpClient) { }

  getCast(character: string): Observable<Cast> {
    return this.http.get<Cast>(this.baseUrl + "character/" + character);
  }

  addCast(cast: Cast, id: number) {
    cast.movieId = id;
    return this.http.post<Cast>(this.baseUrl, cast);
  }

  editCast(cast: Cast) {
    return this.http.put<Cast>(this.baseUrl, cast);
  }

  deleteCast(iMDB: string) {
    return this.http.delete<Cast>(this.baseUrl + "imdb/" + iMDB);
  }
}
