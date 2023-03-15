import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { UsersService } from 'src/app/services/users/users.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersConfirmationComponent } from '../users-confirmation/users-confirmation.component';
import { Rol } from 'src/app/entities/rol';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-users-modify',
  templateUrl: './users-modify.component.html',
  styleUrls: ['./users-modify.component.css']
})
export class UsersModifyComponent implements OnInit {
  userOld: any;
  userNew: any;
  icon_gif: string = "../../../../assets/icons-gif/check.gif";
  rolControl = new FormControl<Rol | null>(null);
  roles: any;
  suscription!: Subscription;
  keyRol!: string;

  constructor(private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UsersModifyComponent>,
    private _userService: UsersService,
    private _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formModify.patchValue({
      idUser: data.user.Cedula,
      name: data.user.Nombres,
      lastname: data.user.Apellidos,
      email: data.user.Email,
      /* password: 'data.user.password', */
      rol: data.cargo
    });
    this.userOld = this._authService.getUserFromLocalStorage();
  }

  formModify = new FormGroup({
    idUser: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    /* password: new FormControl('', Validators.required), */
    rol: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this._userService.GetRol().subscribe((data: any) => {
      this.roles = data;
    });
  }

  onSubmit() {  
    this.userNew = {
      Id: this.data.user.Id,
      Cedula: this.formModify.value.idUser,
      Nombres: this.formModify.value.name,
      Apellidos: this.formModify.value.lastname,
      Email: this.formModify.value.email,
      /* password: this.formModify.value.password, */
      Rol: this.formModify.value.rol
    };
    this._userService.modifyUser(this.userNew).subscribe((data: any) => {
      this.dialogRef.close();
      this.openConfirmation('Actualización de Usuario');
      this.redirecTo('/adm-users');
    },
      (errorData) => alert("Error al Actualizar Usuario" + errorData)
    );
  }

  openConfirmation(text: string) {
    this.dialog.open(UsersConfirmationComponent, {
      width: '35%', data: { text: text, rutaGif: this.icon_gif }
    })
  }

  redirecTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  cancel() {
    this.dialogRef.close();
  }

}
