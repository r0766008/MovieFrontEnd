import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/movies/models/movie.model';
import { Cast } from 'src/app/movies/models/cast.model';
import { MovieService } from 'src/app/movies/services/movie.service';
import { Observable } from 'rxjs';
import { CastService } from 'src/app/movies/services/cast.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  editForm: FormGroup;
  selectedMovieTitle: string = "";
  selectedMovie: Movie = null;
  casts: Observable<Cast[]>;

  constructor(private _movieService: MovieService, private _castService: CastService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  onSubmit() {
    this.selectedMovie.title = this.editForm.controls['title'].value;
    this.selectedMovie.year = this.editForm.controls['year'].value;
    this.selectedMovie.category = this.editForm.controls['category'].value;
    this.selectedMovie.minutes = this.editForm.controls['minutes'].value;
    this._movieService.editMovie(this.selectedMovie).subscribe(res => {
      this.router.navigate(['movies']);
    });
  }

  goToCreate() {
    this.router.navigate(['cast/create'], { queryParams: { title: this.selectedMovieTitle }});
  }

  editCast(cast: Cast) {
    this.router.navigate(['cast/edit'], { queryParams: { title: this.selectedMovieTitle, character: cast.character }});
  }

  deleteCast(cast: Cast) {
    this._castService.deleteCast(cast.iMDB).subscribe(res => {
      this.ngOnInit();
    });
  }

  get f() { return this.editForm.controls; }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedMovieTitle = params['title'];
    });

    this._movieService.getMovie(this.selectedMovieTitle).subscribe(res => {
      this.selectedMovie = res[0]["movie"];
      this.casts = res[0]["casts"];
      this.editForm.controls['title'].setValue(res[0]["movie"].title);
      this.editForm.controls['year'].setValue(res[0]["movie"].year);
      this.editForm.controls['category'].setValue(res[0]["movie"].category);
      this.editForm.controls['minutes'].setValue(res[0]["movie"].minutes);
    });

    this.editForm = this.fb.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      category: ['', Validators.required],
      minutes: ['', Validators.required]
    });
  }
}
