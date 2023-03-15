import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { UsersService } from 'src/app/services/users/users.service';
import { ClientsMessageComponent } from '../clients-message/clients-message.component';

@Component({
  selector: 'app-clients-confirmation',
  templateUrl: './clients-confirmation.component.html',
  styleUrls: ['./clients-confirmation.component.css']
})
export class ClientsConfirmationComponent {
  rutaGif: string = "";
  text: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ClientsConfirmationComponent>,
    private dialog: MatDialog,
    private _userService: UsersService) {
    this.rutaGif = this.data.rutaGif;
  }

  onSubmit() {
    this.dialogRef.close();
    this._userService.modifyUser(this.data.clientOld).subscribe((data: any) => {
      this.openMessage(this.data.text);
    },
      (errorData) => alert("Error al Actualizar Usuario" + errorData)
    );
  }

  openMessage(text: string) {
    this.dialog.open(ClientsMessageComponent, {
      width: '35%',
      data: {
        rutaGif: this.rutaGif,
        text: text
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
