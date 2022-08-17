import { Component, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';


interface UserFormData {
  name: string;
  email: string;
  password: string;
}
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

  public async changeUser(user: IUser) {
    const modalConfig = { width: '30vw', data: { user } };
    const dialogRef = this.dialog.open(UserModalComponent, modalConfig);
    const result = (await firstValueFrom(dialogRef.afterClosed())) as UserFormData;

    console.log (result);
    await firstValueFrom(this.userService.updateUser(this.getUpdatedUser(user, result)));
  }

  public getUpdatedUser(user: IUser, userFormValues: UserFormData): IUser {
    const { name, email, password } = userFormValues;

    return { ...user, name, email, password};
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
