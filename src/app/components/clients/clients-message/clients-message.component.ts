import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-clients-message',
  templateUrl: './clients-message.component.html',
  styleUrls: ['./clients-message.component.css']
})
export class ClientsMessageComponent {
  texto:string =""
  rutaGif:string=""

  constructor(private dialogRef:MatDialogRef<ClientsMessageComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any){
    this.rutaGif = this.data.rutaGif;
    this.texto = this.data.text;
  }

  onSubmit(){
    this.dialogRef.close();
  }
}
