import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable, map, firstValueFrom, lastValueFrom } from 'rxjs';
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

  public async onMovieRatingUpdate(film: IFilm, user: IUser, rat: number) {
    const newRating = Math.round((film.rating + rat) / 2);

       const feed = {...film.feedback, userId:user.id , movieRating:rat}
       const newFilm = {...film, rating:newRating, feedback:feed};
       const feedF = {...film.feedback, userId:user.id , movieRating:rat, filmId:film.id}
   await firstValueFrom(this.filmService.updateFilm(newFilm));
   await firstValueFrom(this.feedbackService.updateFilmFeedback(film, user.id, feedF));
  }

  public showMessage() {
    this.message = "Зарегистрируйтесь или войдите в свой профиль";
  }

  public deleteMessage () {
    this.message = "";
  }
}
