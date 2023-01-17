import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { ClientsConfirmationComponent } from '../clients-confirmation/clients-confirmation.component';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-clients-modify',
  templateUrl: './clients-modify.component.html',
  styleUrls: ['./clients-modify.component.css']
})
export class ClientsModifyComponent {
  icon_gif: string = "../../../../assets/icons-gif/update.gif";
  userOld: any;
  userNew: any;

  constructor(private dialog: MatDialog, private userService: UsersService) {
    this.userOld = this.userService.getUser(this.userOld as User);
    if (this.userOld != null) {
      this.formModify.setValue({
        idUser: this.userOld.id,
        name: this.userOld.name,
        lastname: this.userOld.lastname,
        email: this.userOld.email
      });
    }
  }

  formModify = new FormGroup({
    idUser: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  openDialogConfirmation() {
    this.userNew = {
      idUser: this.formModify.value.idUser,
      name: this.formModify.value.name,
      lastname: this.formModify.value.lastname,
      email: this.formModify.value.email,
      /* password: this.userOld.password,
      rol: this.userOld.password */
    };
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
