import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { UsersService } from 'src/app/services/users/users.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-modify',
  templateUrl: './users-modify.component.html',
  styleUrls: ['./users-modify.component.css']
})
export class UsersModifyComponent {
  userOld: any;
  userNew: any;

  constructor(private router: Router, 
    private dialogRef: MatDialogRef<UsersModifyComponent>, 
    private userService: UsersService, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formModify.setValue({
      idUser: data.user.idUser,
      name: data.user.name,
      lastname: data.user.lastname,
      email: data.user.email,
      password: data.user.password,
      rol: data.user.rol
    });
  }

  formModify = new FormGroup({
    idUser: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required) 
  });

  onSubmit() {
    this.userNew = {
      idUser: this.formModify.value.idUser,
      name: this.formModify.value.name,
      lastname: this.formModify.value.lastname,
      email: this.formModify.value.email,
      password: this.formModify.value.password,
      rol:this.formModify.value.rol
    };
    this.dialogRef.close();
    this.userService.modifyUser(this.userNew as User, this.data.user as User);
    this.redirecTo('/adm-users');
  }

  redirecTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  cancel() {
    this.dialogRef.close();
  }
}
