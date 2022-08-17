import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent {
  @Input() rating?: number
  @Output() update = new EventEmitter<number>();

  public readonly values = [1,2,3,4,5,6,7,8,9,10];
  constructor() { }

  public apply(rating: number) {
    this.update.emit(rating);

  }

  public isActive(val: number): boolean {
    return val <= (this.rating || 0);
  }

}


