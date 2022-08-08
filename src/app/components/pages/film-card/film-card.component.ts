import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IFilm } from 'src/app/interfaces/film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  @Input() film!: IFilm;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goToFilmPage(film: IFilm) {
    this.router.navigate([`/catalog/${film.id}`]);
  }

}
