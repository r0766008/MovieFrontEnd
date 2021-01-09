import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Cast } from '../models/cast.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  selectedMovieTitle: string = "";
  selectedMovie: Movie = null;
  casts: Observable<Cast[]>;

  constructor(private _movieService: MovieService, private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedMovieTitle = params['title'];
    });

    this._movieService.getMovie(this.selectedMovieTitle).subscribe(res => {
      this.selectedMovie = res[0]["movie"];
      this.casts = res[0]["casts"];
    });
  }

  public createImgPath(imagePath: string) {
    return "https://image.tmdb.org/t/p/w500/" + imagePath + ".jpg";
  }

  navigateCast(c: Cast) {
    this.router.navigate(['/cast'], { queryParams: { character: c.character }});
  }
}
