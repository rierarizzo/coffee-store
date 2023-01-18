import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-product-confirmation',
  templateUrl: './product-confirmation.component.html',
  styleUrls: ['./product-confirmation.component.css']
})
export class ProductConfirmationComponent {
  texto: string = "";
  rutaGif: string = "";
  
  constructor(private dialogRef: MatDialogRef<ProductConfirmationComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.texto = this.data.texto;
    this.rutaGif = this.data.rutaGif;
    
  }
  onSubmit() {
    this.dialogRef.close();
  }
}
