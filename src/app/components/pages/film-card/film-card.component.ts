import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable, map } from 'rxjs';
import { IFeedback } from 'src/app/interfaces/feedback';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})

export class FilmCardComponent implements OnInit {
  [x: string]: any;

  @Input() film!: IFilm;

  public user$: Observable<IUser | null>;
  public message: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private filmService: FilmService,
    private feedbackService: FeedbackService
  ) {
    this.user$ = this.userService.currentUser$;
  }

  ngOnInit(): void {}

  public goToFilmPage(film: IFilm) {
    this.router.navigate([`/catalog/${film.id}`]);
  }

  public onMovieRatingUpdate(film: IFilm, user: IUser, rating: number) {
    const newRating = (film.rating + rating) / 2;
    const newFeedback = {userId: user.id, filmId: film.id, movieRating: rating};
      const newFilm = {
      title: film.title,
      originalTitle: film.originalTitle,
      id: film.id,
      trailer: film.trailer,
      year: film.year,
      directors: film.directors,
      writers: film.writers,
      actors: film.actors,
      runtime: film.runtime,
      urlPoster: film.urlPoster,
      countries: film.countries,
      languages: film.languages,
      genres: film.genres,
      plot: film.plot,
      urlIMDB: film.urlIMDB,
      rated: film.rated,
      type: film.type,
      rating: newRating,
      price: film.price,
      counts: film.counts,

    };
    this.filmService.updateFilm(newFilm).pipe().subscribe();
  }

  public showMessage() {
    this.message = "Зарегистрируйтесь или войдите в свой профиль";
  }

  public deleteMessage () {
    this.message = "";
  }
}
