import { Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/entities/products';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { ProductConfirmationComponent } from '../product-confirmation/product-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
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
   private formBuilder:FormBuilder, private dialog: MatDialog,private _snackBar: MatSnackBar){
     
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
  
      const producto: Product = {
        Codigo: this.formModify.value.Codigo,
        Nombre: this.formModify.value.Nombre,
        Precio: this.formModify.value.Precio,
        Categoria: this.formModify.value.Categoria,
        Estado: this.formModify.value.Estado,
        Descripcion: this.formModify.value.Descripcion,
        Imagen: ""
      }

      this._snackBar.open('El Producto '+this.data.Product.Codigo+ ' fue modificado con éxito','',{
        duration: 1500,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        })



      this.router.navigate(['/'])
      .then(()=>this.router.navigate(['/adm-productos/view'],{state:{editarDatos: this.productsService.Modificar(producto)}}))
  
  
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
      
  
  
      this.dialogRef.close();
  
  

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
