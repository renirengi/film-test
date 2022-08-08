import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Observable, map, tap } from 'rxjs';

const userLoggedIn = 'You are logged in!';
const loginFailed = 'Wrong email or password!'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  public showConfirmation = true;
  public result$?: Observable<string>;

  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    });

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private usersService: UserService
    ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    const email = this.loginForm.value['email'] as string;
    const password = this.loginForm.value['password'] as string;

    this.result$ = this.usersService.loginUser(email, password).pipe(
      map((result) => result ? userLoggedIn : loginFailed))
      tap((result) => {
        result && this.dialogRef.close();
        console.log(result)
      })
    ;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
