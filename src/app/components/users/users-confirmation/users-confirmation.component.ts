import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-users-confirmation',
  templateUrl: './users-confirmation.component.html',
  styleUrls: ['./users-confirmation.component.css']
})

export class UsersConfirmationComponent {

  texto: string = "";
  rutaGif: string = "";

  constructor(private dialogRef: MatDialogRef<UsersConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.texto = this.data.text;
    this.rutaGif = this.data.rutaGif;
  }

  onSubmit() {
    this.dialogRef.close();
  }

}
