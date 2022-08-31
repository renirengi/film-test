import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilm } from 'src/app/interfaces/film';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {
  public genres$: Observable<string[]>;
  value:string=''

  constructor(
    private filmService: FilmService,
    private router: Router
  ) {
    this.genres$ = filmService.getAvailable('genre');
   }

   onRoute(par:string){
    this.filmService._currentGenre$.next(par);
    this.router.navigate(['/catalog']);
   }

  ngOnInit(): void {
  }

}
