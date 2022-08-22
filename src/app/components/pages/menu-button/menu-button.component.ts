import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {
  public genres$: Observable<string[]>;

  constructor(
    private filmService: FilmService
  ) {
    this.genres$ = filmService.getAvailable('genre');
   }

  ngOnInit(): void {
  }

}
