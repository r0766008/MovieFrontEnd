import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/movies/models/movie.model';
import { Cast } from 'src/app/movies/models/cast.model';
import { MovieService } from 'src/app/movies/services/movie.service';
import { Observable } from 'rxjs';
import { CastService } from 'src/app/movies/services/cast.service';

@Component({
  selector: 'app-cast-edit',
  templateUrl: './cast-edit.component.html',
  styleUrls: ['./cast-edit.component.scss']
})
export class CastEditComponent implements OnInit {
  editForm: FormGroup;
  selectedMovieTitle: string = "";
  selectedCastCharacter: string = "";
  selectedCast: Cast = null;

  constructor(private _castService: CastService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  onSubmit() {
    this.selectedCast.firstName = this.editForm.controls['firstName'].value;
    this.selectedCast.lastName = this.editForm.controls['lastName'].value;
    this.selectedCast.character = this.editForm.controls['character'].value;
    this.selectedCast.age = this.editForm.controls['age'].value;
    this.selectedCast.birthPlace = this.editForm.controls['birthPlace'].value;
    this._castService.editCast(this.selectedCast).subscribe(res => {
      this.router.navigate(['movies/edit'], { queryParams: { title: this.selectedMovieTitle }});
    });
  }

  get f() { return this.editForm.controls; }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedMovieTitle = params['title'];
      this.selectedCastCharacter = params['character'];
    });

    this._castService.getCast(this.selectedCastCharacter).subscribe(res => {
      this.selectedCast = res[0]["cast"];
      this.editForm.controls['firstName'].setValue(res[0]["cast"].firstName);
      this.editForm.controls['lastName'].setValue(res[0]["cast"].lastName);
      this.editForm.controls['character'].setValue(res[0]["cast"].character);
      this.editForm.controls['age'].setValue(res[0]["cast"].age);
      this.editForm.controls['birthPlace'].setValue(res[0]["cast"].birthPlace);
    });

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      character: ['', Validators.required],
      age: ['', Validators.required],
      birthPlace: ['', Validators.required]
    });
  }
}
