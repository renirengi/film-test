import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly headerModalConfig = { width: '30vw', data: {} };

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
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
