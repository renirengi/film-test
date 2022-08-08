import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  public showConfirmation = true;
  public passwordInput: string = '';
  public passwordConfirmInput: string = '';

  public registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<RegisterModalComponent>,
    private userService: UserService
  ) { }

  get email() {
    return this.registerForm.controls.email as FormControl
  }

  get password() {
    return this.registerForm.controls.password as FormControl
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword as FormControl
  }



  onSubmit () {
    this.userService.addUser({
      email: this.registerForm.value['email'] as string,
      password: this.registerForm.value['password'] as string,
      }).subscribe(() => this.dialogRef.close())

    /*await firstValueFrom(this.userService.addUser({
      email: this.registerForm.value['email'] as string,
      password: this.registerForm.value['password'] as string,
    }));
    this.dialogRef.close();*/
  }

  onNoClick () {
    this.dialogRef.close();
  }



  ngOnInit(): void {
  }

}
