import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;
  private readonly headerModalConfig = { width: '30vw', data: {} };
  public currentUser$!: BehaviorSubject<IUser | null>;

  public searchString: string = '';
  public filmsSearchString$: BehaviorSubject<string>;
  public change:boolean=false;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private filmService: FilmService,
  ) {
    this.currentUser$ = this.userService.currentUser$;
    this.filmsSearchString$ = this.filmService.filmSearchString$;
   }

  ngOnInit(): void {
  }
  public onChange({ target }: Event){
    const str = (target as HTMLInputElement).value;
    const q = str !== '' ? str : undefined;
    this.router.navigate(['/catalog'], { queryParams: { q } });
  }

  public onClean() {
    console.log('clean')
    this.router.navigate(['/catalog']);
  }

  public onLogout() {
    this.userService.logOutUser();
  }

  public showRegisterModal() {
    this.dialog.open(RegisterModalComponent, this.headerModalConfig);
  }

  public showLoginModal() {
    this.dialog.open(LoginModalComponent, this.headerModalConfig);
  }

  public goToCatalogPage() {
    this.router.navigate(['/catalog']);
  }
}
