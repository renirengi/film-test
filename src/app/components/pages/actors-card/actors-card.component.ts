import { Component, Input, OnInit } from '@angular/core';
import { IActor } from 'src/app/interfaces/film';

@Component({
  selector: 'app-actors-card',
  templateUrl: './actors-card.component.html',
  styleUrls: ['./actors-card.component.scss']
})
export class ActorsCardComponent implements OnInit {
  @Input() actors!: IActor[];

 public basicIcon:string= "https://cdn-icons-png.flaticon.com/512/149/149995.png"

  constructor() { }

  ngOnInit(): void {
  }

}
