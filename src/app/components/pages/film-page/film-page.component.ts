import { Component } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router} from '@angular/router';
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
    private router: Router,
    private filmService: FilmService,


  ) {
    const dollId$ = this.activatedRoute.params.pipe(map((params) => params['id']));

    this.film$ = dollId$.pipe(switchMap((id) => this.filmService.getFilmByID(id)));

  }

  public onCheck(title:string, value: string|number) {
    if(title==="year") {
      this.filmService._currentYear$.next(String(value));
    }
    else if (title==="director" && typeof value=="string") {
      this.filmService._currentDirector$.next(value);
    }
    else if (title==="writer" && typeof value=="string") {
      this.filmService._currentWriter$.next(value);
    }
    else if (title==="actor" && typeof value=="string") {
      this.filmService._currentActor$.next(value);
    }
    else if (title==="genre" && typeof value=="string") {
      this.filmService._currentGenre$.next(value);
    }
    this.router.navigate(['/catalog']);
  }
}
