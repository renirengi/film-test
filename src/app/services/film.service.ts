import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilm } from '../interfaces/film';

import {catchError, delay, Observable, retry, tap, throwError, shareReplay} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly baseUrl = 'http://localhost:3000/films';

  films: IFilm[] = [];
  page: number = 1;

  constructor(
    private http: HttpClient
  ) { }

  public getFilmsPage(page: number): Observable<IFilm[]> {
    const url = `${this.baseUrl}?_page=${page}`;

    return this.http.get<IFilm[]>(url).pipe(shareReplay());
  }

  public getAll(): Observable<IFilm[]> {
    return this.http.get<IFilm[]>(this.baseUrl).pipe(
      retry(2),
      tap(films => this.films = films)
    )
  }

  public getFilmByID(id:number) {
    const url =  `${this.baseUrl}/${String(id)}`;
    return this.http.get<IFilm>(url);
  }
}
