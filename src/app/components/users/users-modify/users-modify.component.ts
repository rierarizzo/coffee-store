import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-users-modify',
  templateUrl: './users-modify.component.html',
  styleUrls: ['./users-modify.component.css']
})
export class UsersModifyComponent {

  constructor(private dialogRef: MatDialogRef<UsersModifyComponent>) { }

  userModify = new FormGroup({
    idUser: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    let objToSend: NavigationExtras = {
      queryParams: {
        idUser: this.userModify.value.idUser,
        name: this.userModify.value.name,
        lastname: this.userModify.value.lastname,
        email: this.userModify.value.email,
        password: this.userModify.value.password,
      },
      skipLocationChange: false,
      fragment: 'top'
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
