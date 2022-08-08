import { Component } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IFilm } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent {
  film$: Observable<IFilm>;



  constructor(
    private activatedRoute: ActivatedRoute,
    private filmService: FilmService,

  ) {
    const dollId$ = this.activatedRoute.params.pipe(map((params) => params['id']));

    this.film$ = dollId$.pipe(switchMap((id) => this.filmService.getFilmByID(id)));

  }

}
