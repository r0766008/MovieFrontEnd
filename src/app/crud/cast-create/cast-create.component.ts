import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/movies/models/movie.model';
import { CastService } from 'src/app/movies/services/cast.service';
import { MovieService } from 'src/app/movies/services/movie.service';

@Component({
  selector: 'app-cast-create',
  templateUrl: './cast-create.component.html',
  styleUrls: ['./cast-create.component.scss']
})
export class CastCreateComponent implements OnInit {
  createForm: FormGroup;
  selectedMovieTitle: string = "";
  selectedMovie: Movie = null;

  constructor(private _castService: CastService, private _movieService: MovieService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedMovieTitle = params['title'];
    });

    this._movieService.getMovie(this.selectedMovieTitle).subscribe(res => {
      this.selectedMovie = res[0]["movie"];
    });

    this.createForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      character: ['', Validators.required],
      age: ['', Validators.required],
      birthPlace: ['', Validators.required],
      iMDB: ['', Validators.required]
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this._castService.addCast(this.createForm.value, this.selectedMovie.id).subscribe(res => {
      this.router.navigate(['movies/edit'], { queryParams: { title: this.selectedMovieTitle }});
    });
  }
}
