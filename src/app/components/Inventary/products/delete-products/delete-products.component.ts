import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service'; 
import { ProductConfirmationComponent } from '../product-confirmation/product-confirmation.component';
@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.css']
})
export class DeleteProductsComponent {

  constructor(private router: Router, 
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private dialogRef: MatDialogRef<DeleteProductsComponent>,
   private productsService: ProductsService
  , private dialog: MatDialog){
  }

  onSubmit() {
    this.dialogRef.close();
    this.productsService.deleteProduct(this.data.Product);
    this.openConfirmation('Eliminación de Usuario');
    this.redirecTo('/adm-productos/view');
  }
  openConfirmation(text: string) {
    this.dialog.open(ProductConfirmationComponent, {
      width: '35%', data: { text: text}
    })
  }
  redirecTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  
  }
}
