import { Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/entities/products';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { ProductConfirmationComponent } from '../product-confirmation/product-confirmation.component';

@Component({
  selector: 'app-modify-products',
  templateUrl: './modify-products.component.html',
  styleUrls: ['./modify-products.component.css']
})
export class ModifyProductsComponent{
  productOld: any;
  productNew: any;
  formModify!:FormGroup;


   constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, 
   private dialogRef: MatDialogRef<ModifyProductsComponent>, private productsService: ProductsService, 
   private formBuilder:FormBuilder, private dialog: MatDialog){
     
   }
    
   ngOnInit():void{
      this.formModify = this.formBuilder.group({
      Codigo:  ['', Validators.required],
      Nombre:   ['', Validators.required],
      Precio: ['', Validators.required],
      Categoria:  ['', Validators.required],
      Estado:  ['', Validators.required],
      Descripcion:  ['', Validators.required]
    });
 
    if(this.data){
      this.formModify.controls['Codigo'].setValue(this.data.Product.Codigo),
      this.formModify.controls['Nombre'].setValue(this.data.Product.Nombre),
      this.formModify.controls['Precio'].setValue(this.data.Product.Precio),
      this.formModify.controls['Categoria'].setValue(this.data.Product.Categoria),
      this.formModify.controls['Estado'].setValue(this.data.Product.Estado),
      this.formModify.controls['Descripcion'].setValue(this.data.Product.Descripcion)
        }
   }
    onSubmit() {
      this.productNew = {
        Codigo: this.formModify.value.Codigo,
        Nombre: this.formModify.value.Nombre,
        Precio: this.formModify.value.Precio,
        Categoria: this.formModify.value.Categoria,
        Estado: this.formModify.value.Estado,
        Descripcion: this.formModify.value.Descripcion
      };

      this.productOld = {
        Codigo: this.data.Product.Codigo,
        Nombre: this.data.Product.Nombre,
        Precio: this.data.Product.Precio,
        Categoria: this.data.Product.Categoria,
        Estado: this.data.Product.Estado,
        Descripcion: this.data.Product.Descripcion,
        Imagen: this.data.Product.Imagen,
      };
      console.log(this.productNew);
      console.log(this.productOld);
      this.dialogRef.close();
      this.productsService.modifyProduct(this.productNew as Product, this.productOld as Product);
      this.openConfirmation('Actualización de Producto');
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
