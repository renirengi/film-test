import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  public showConfirmation = true;
  public passwordInput: string = '';
  public passwordConfirmInput: string = '';

  public userForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(6), Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(3), Validators.maxLength(16)]),
    passwordConfirmation: new FormControl('', [Validators.minLength(3), Validators.maxLength(16)]),
  });

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: IUser }
  ) {
    this.applyFormValues(data.user);
    }

    private applyFormValues(user: IUser): void {
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
}
