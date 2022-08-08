import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilm } from 'src/app/interfaces/film';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent {
  @Input()
  films!: IFilm[];
  @Input() currentPage: number|null = null;
  @Input() showLoadMore: boolean = false;
  @Output() loadMore = new EventEmitter()

  constructor() { }

  public onLoadMore() {
    this.loadMore.emit();
  }

  }
