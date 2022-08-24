import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {
  public genres$: Observable<string[]>;


  constructor(
    private filmService: FilmService,
    private router: Router
  ) {
    this.genres$ = filmService.getAvailable('genre');
   }

   onRoute(param:string){
    let string = `/catalog?genres_like=${param}`;
    console.log(string)
    ///this.router.navigate(['/catalog'], { queryParams: { q } })
   }

  ngOnInit(): void {
  }

}
