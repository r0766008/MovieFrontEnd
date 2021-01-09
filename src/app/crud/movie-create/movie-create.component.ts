import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/movies/services/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(private _movieService: MovieService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      category: ['', Validators.required],
      minutes: ['', Validators.required],
      imdbID: ['', Validators.required]
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this._movieService.addMovie(this.createForm.value).subscribe(res => {
      this.router.navigate(['movies']);
    });
  }
}
