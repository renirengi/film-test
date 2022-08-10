import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;
  private readonly headerModalConfig = { width: '30vw', data: {} };
  public currentUser$!: BehaviorSubject<IUser | null>;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {
    this.currentUser$ = this.userService.currentUser$;
   }

  ngOnInit(): void {
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
