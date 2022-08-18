import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}

@Component ({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent  implements OnInit{
  @Input() rating?: number
  @Output() update = new EventEmitter<number>();

  public starCount: number = 10;
  public color: string = 'accent';
  public ratingArr: number[] = [];

  //public readonly values = [1,2,3,4,5,6,7,8,9,10];
  constructor() { }

  ngOnInit():void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    console.log(rating)
    this.update.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if(this.rating){
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  return false;
  }

}


