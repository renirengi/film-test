import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public user$: Observable<IUser | null>;
  public isVisibleAbout = false;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
    ) {
    this.user$= this.userService.currentUser$;
    }

  ngOnInit(): void {
  }

  public onTakeCover () {
    if (this.isVisibleAbout) {
   this.isVisibleAbout = false;
  }
  else {
    this.isVisibleAbout = true;
  }
  }

}
