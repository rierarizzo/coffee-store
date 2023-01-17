import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-product-confirmation',
  templateUrl: './product-confirmation.component.html',
  styleUrls: ['./product-confirmation.component.css']
})
export class ProductConfirmationComponent {
  texto: string = "";
  
  constructor(private dialogRef: MatDialogRef<ProductConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.texto = this.data.text;
    
  }
  onSubmit() {
    this.dialogRef.close();
  }
}
