import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { IFilm } from 'src/app/interfaces/film';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  public films!: IFilm[];

  private lastPage: number = 1;
  public displayedPage: number | null = 1;
  public nextPage: number = 2;
  public previousPage: number = 0;
  public showLoadMore: boolean = true;
  public showButton: boolean= true;
  public endPage:number=0;
  public appliedFilters?: {[key: string]: string};
  constructor(
    public filmService: FilmService,
    public route: ActivatedRoute,
  ) {

   }

  async ngOnInit(): Promise<void> {

    this.films = await lastValueFrom(this.filmService.getFilmsPage(this.lastPage));
    const allFilms = await lastValueFrom(this.filmService.getAll());
    this.showButton= true;
    this.endPage = Math.floor(allFilms.length/10);

  }

  public async applyFilters(params: {[key: string]: string}) {
    this.films = await lastValueFrom(this.filmService.findFilmsByParams(params));
    //this.displayedPage = null;
    this.showLoadMore = false;
    this.showButton= false;
  }


  public async onLoadMore() {
    const newFilms = await lastValueFrom(this.filmService.getFilmsPage(this.lastPage + 1));

    this.films = newFilms;
    this.lastPage += 1;
    this.displayedPage = this.lastPage;
    this.nextPage= this.displayedPage+1;

  }

  /*public async onLoadBack() {
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
    this.nextPage= this.displayedPage+1;
    this.previousPage = this.displayedPage-1;
  }

}
