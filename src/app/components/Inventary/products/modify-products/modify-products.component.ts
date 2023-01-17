import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/entities/products';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { ProductConfirmationComponent } from '../product-confirmation/product-confirmation.component';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-modify-products',
  templateUrl: './modify-products.component.html',
  styleUrls: ['./modify-products.component.css']
})
export class ModifyProductsComponent{
  productOld: any;
  productNew: any;

  constructor(private router: Router,
    private dialog: MatDialog,
     private dialogRef: MatDialogRef<ModifyProductsComponent>, 
     private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formModify.setValue({
      Codigo: data.product.Codigo,
      Nombre: data.product.Nombre,
      Precio: data.product.Precio,
      Categoria: data.product.Categoria,
      Estado: data.product.Estado,
      Descripcion: data.product.Descripcion,
      Imagen: data.product.Imagen

    });
  }
    formModify = new FormGroup({
      Codigo: new FormControl('', Validators.required),
      Nombre: new FormControl('', Validators.required),
      Precio: new FormControl('', Validators.required),
      Categoria: new FormControl('', Validators.required),
      Estado: new FormControl('', Validators.required),
      Descripcion: new FormControl('', Validators.required),
      Imagen: new FormControl('', Validators.required)
    });

    onSubmit() {
      this.productNew = {
        Codigo: this.formModify.value.Codigo,
        Nombre: this.formModify.value.Nombre,
        Precio: this.formModify.value.Precio,
        Categoria: this.formModify.value.Categoria,
        Estado: this.formModify.value.Estado,
        Descripcion: this.formModify.value.Descripcion,
        Imagen: this.formModify.value.Imagen
      };
      this.dialogRef.close();
      this.productsService.modifyProduct(this.productNew as Product, this.data.product as Product);
      this.openConfirmation('Producto Modificado');
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

}
