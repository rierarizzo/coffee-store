import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { ClientsConfirmationComponent } from '../clients-confirmation/clients-confirmation.component';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientsViewComponent } from '../clients-view/clients-view.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-modify',
  templateUrl: './clients-modify.component.html',
  styleUrls: ['./clients-modify.component.css']
})
export class ClientsModifyComponent {
  icon_gif: string = "../../../../assets/icons-gif/update.gif";
  userOld: any;
  userNew: any;
  suscription!: Subscription;
  rol!:string;
  constructor(private dialog: MatDialog, private _userService: UsersService, private authService: AuthenticationService) {
    this.userOld = this.authService.getUserFromLocalStorage();
  }

  ngOnInit(): void {
    this.obtenerdatos();
    this.suscription = this._userService.refresh$.subscribe(() => {
      this.obtenerdatos();
    }
    );
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  obtenerdatos(): void {
    this._userService.getDatosId(this.userOld.id).subscribe((data: any) => {
      this.formModify.setValue({
        idUser: data[0]['Cedula'],
        name: data[0]['Nombres'],
        lastname: data[0]['Apellidos'],
        email: data[0]['Email']
      });
      this.rol = this.userOld.rol;
      this.userOld = data;
    });
  }

  formModify = new FormGroup({
    idUser: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  openDialogConfirmation() {
    this.userNew = {
      Id : this.userOld[0]['Id'],
      Cedula: this.formModify.value.idUser,
      Nombres: this.formModify.value.name,
      Apellidos: this.formModify.value.lastname,
      Email: this.formModify.value.email,
      /* password: this.userOld.password, */
      Rol: this.rol,
    };
    this.userOld = this.userNew;
    this.openConfirmation('Actualización de Perfil');
  }

  openConfirmation(text: string) {
    this.dialog.open(ClientsConfirmationComponent, {
      width: '70%',
      data: {
        rutaGif: this.icon_gif,
        clientOld: this.userOld,
        clientNew: this.userNew,
        text: text
      }
    });
    this.clearForm();
  }

  cancel() {
    this.clearForm();
  }

  clearForm() {
    this.formModify.setValue({
      idUser: '',
      name: '',
      lastname: '',
      email: ''
    });
  }
}
