import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IFilm } from '../interfaces/film';

import {catchError, map, delay, Observable, retry, tap, throwError, shareReplay, BehaviorSubject} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly baseUrl = 'http://localhost:3000/films';

  films: IFilm[] = [];
  page: number = 1;

  public readonly filmSearchString$ = new BehaviorSubject<string>('');

  public set filmSearchString(str: string) {
    this.filmSearchString$.next(str);
  }

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

  public findFilmsByParams(params: { [key: string]: string }): Observable<IFilm[]> {
    return this.http.get<IFilm[]>(this.baseUrl, { params });
  }

  public getAvailable(value: string): Observable<string[]> {
    return this.http.get<IFilm[]>('http://localhost:3000/films').pipe(
      map((films) => {
        const years = new Set();
        if (value === 'year') {
          films.forEach((film) => years.add(film.year));

        } else if (value === 'type') {
          films.forEach((film) => years.add(film.type));
        } else if (value === 'genre') {
          films.forEach((film) => years.add(film.genres));
        } else if (value === 'country') {
          films.forEach((film) => years.add(film.countries));
        } else if (value === 'language') {
          films.forEach((film) => years.add(film.languages));
        } else if (value === 'director') {
          films.forEach((film) => years.add(film.directors));
        } else if (value === 'rated') {
          films.forEach((film) => years.add(film.rated));
        }

        let newSet = new Set(Array.from(years).flat().sort());
        return  Array.from(newSet) as string[];

      })
    );
  }

  public getFilmByID(id:number) {
    const url =  `${this.baseUrl}/${String(id)}`;
    return this.http.get<IFilm>(url);
  }

  public updateFilm(film:IFilm): Observable <IFilm> {
    console.log(film.id);
    return this.http.patch<IFilm>(`${this.baseUrl}/${film.id}`, film);
  }
}
