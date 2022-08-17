import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.scss']
})
export class UserAboutComponent implements OnInit {
 @Input() user!: IUser;
 @Input() isVisibleAbout!: boolean;
 @Output() update = new EventEmitter<boolean>()
  registerForm: any;

  constructor(
    private userService:UserService
  ) { }

  public userAboutForm = new FormGroup ({
    phoneNumber:new FormControl('', [Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{9}$/)]),
    state: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl('')
  })

  ngOnInit(): void {

  }

  async onSubmit () {
      const phoneNumber = this.userAboutForm.value['phoneNumber'] as string;
      const state = this.userAboutForm.value['state'] as string;
      const zipCode = this.userAboutForm.value['zipCode'] as string;
      const city = this.userAboutForm.value['city'] as string;
      const address = this.userAboutForm.value['address'] as string;

    await lastValueFrom(this.userService.updateUser({ ...this.user, personalData: { phoneNumber, state, zipCode, city, address } }))
    this.apply(this.isVisibleAbout);
  }

  public apply (isVisibleAbout:boolean) {
    this.update.emit(isVisibleAbout);
  }

}
