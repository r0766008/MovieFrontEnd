import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Cast } from '../models/cast.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CastService } from '../services/cast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cast-detail',
  templateUrl: './cast-detail.component.html',
  styleUrls: ['./cast-detail.component.scss']
})
export class CastDetailComponent implements OnInit {

  selectedCastCharacter: string = "";
  selectedCast: Cast = null;
  movies: Observable<Movie[]>;

  constructor(private _castService: CastService, private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCastCharacter = params['character'];
    });

    this._castService.getCast(this.selectedCastCharacter).subscribe(res => {
      this.selectedCast = res[0]["cast"];
      this.movies = res[0]["movies"];
    });
  }

  public createImgPath(imagePath: string) {
    return "https://image.tmdb.org/t/p/w500/" + imagePath + ".jpg";
  }

  navigateMovie(m: Movie) {
    this.router.navigate(['/movie'], { queryParams: { title: m.title }});
  }
}
