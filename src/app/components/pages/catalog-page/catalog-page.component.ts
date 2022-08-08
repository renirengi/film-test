import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { IFilm } from 'src/app/interfaces/film';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {


  public films!: IFilm[];

  private lastPage: number = 1;
  public displayedPage: number = 1;
  //public nextPage: number = 2;
  public showLoadMore: boolean = true;
  public endPage:number=0
  constructor(
    public filmService: FilmService
  ) { }

  async ngOnInit(): Promise<void> {
    this.films = await lastValueFrom(this.filmService.getFilmsPage(this.lastPage));

    const allFilms = await lastValueFrom(this.filmService.getAll());
    this.endPage = Math.floor(allFilms.length/10);

  }

  /*public async onLoadMore() {
    const newFilms = await lastValueFrom(this.filmService.getFilmsPage(this.lastPage + 1));

    this.films = newFilms;
    this.lastPage += 1;
    this.displayedPage = this.lastPage;
    this.nextPage= this.displayedPage+1;

  }

  public async onLoadBack() {
    const newFilms = await lastValueFrom(this.filmService.getFilmsPage(this.lastPage - 1));

    this.films = newFilms;
    this.lastPage -= 1;
    this.displayedPage = this.lastPage;
    this.nextPage= this.displayedPage+1;
  }*/

  public async onLoadPage(num:number) {
    const newFilms = await lastValueFrom(this.filmService.getFilmsPage(num));

    this.films = newFilms;
    this.displayedPage = num;
    //this.nextPage= this.displayedPage+1;
  }

}
