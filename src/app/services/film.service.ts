import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilm } from '../interfaces/film';

import {catchError, map, delay, Observable, retry, tap, throwError, shareReplay, BehaviorSubject, switchMap} from 'rxjs'
import { IFeedback } from '../interfaces/feedback';
import { FeedbackService } from './feedback.service';
import { CelebreService } from './celebre.service';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly baseUrl = 'http://localhost:3000/films';

  films: IFilm[] = [];
  page: number = 1;
  public _currentGenre$ = new BehaviorSubject<string|null>(null);
  public _currentDirector$ = new BehaviorSubject<string|null>(null);
  public _currentWriter$ = new BehaviorSubject<string|null>(null);
  public _currentYear$ = new BehaviorSubject<string|null>(null);
  public _currentActor$ = new BehaviorSubject<string|null>(null);

  public _currentUrl$ = new BehaviorSubject<any|null>(null);
  public readonly filmSearchString$ = new BehaviorSubject<string>('');
  public url: any;

  public set filmSearchString(str: string) {
    this.filmSearchString$.next(str);
  }

  constructor(
    private http: HttpClient,
    private feedback: FeedbackService,
    private celebre: CelebreService
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
        } else if (value === 'rated') {
          films.forEach((film) => years.add(film.rated));
        }
        else if (value === 'years') {
          films.forEach((film) => years.add(film.year));
        }
        else if (value === 'prices') {
          films.forEach((film) => years.add(film.price));
          let newSet = new Set(Array.from(years).flat().sort(this.compareNumbers))
          return  Array.from(newSet).map((elem) => String(elem)) as string[];
        }
        else if (value === 'rating') {
          films.forEach((film) => years.add(film.rating));
          let newSet = new Set(Array.from(years).flat().sort(this.compareNumbers))
          return  Array.from(newSet).map((elem) => String(elem)) as string[];
        }

        let newSet = new Set(Array.from(years).flat().sort());
        return  Array.from(newSet) as string[];

      })
    );
  }


  private compareNumbers(a:any, b:any) {
    return a - b;
  }

  public getFilmByID(id:number) {
    const url =  `${this.baseUrl}/${String(id)}`;
    return this.http.get<IFilm>(url);
  }

  public updateFilm(film:IFilm): Observable <IFilm> {
    return this.http.patch<IFilm>(`${this.baseUrl}/${film.id}`, film);
  }

  public updateFilmFeedback(film: IFilm, userId: number, feedback: Partial<IFeedback>): Observable<IFilm> {
    return this.feedback.updateFilmFeedback(film, userId, feedback).pipe(
      switchMap(() => {
        return this.feedback.getFilmFeedback(film.id);
      }),
      map((feedback) => ({...film, feedback}))
    );
  }
}
