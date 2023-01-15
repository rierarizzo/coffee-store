import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { UsersService } from 'src/app/services/users/users.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-users-modify',
  templateUrl: './users-modify.component.html',
  styleUrls: ['./users-modify.component.css']
})
export class UsersModifyComponent {

  constructor(private dialogRef: MatDialogRef<UsersModifyComponent>, private userService: UsersService, @Inject(String) private userOld: any) {
    this.userOld = new FormGroup({
      idUser: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  userNew: any;

  userCurrent = new FormGroup({
    idUser: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    <User>this.userNew({
      idUser: this.userCurrent.value.idUser,
      name: this.userCurrent.value.name,
      lastname: this.userCurrent.value.lastname,
      email: this.userCurrent.value.email,
      password: this.userCurrent.value.password,
    });

    this.userService.modifyUser(this.userNew, this.userOld);
  }

  cancel() {
    this.dialogRef.close();
  }
}
