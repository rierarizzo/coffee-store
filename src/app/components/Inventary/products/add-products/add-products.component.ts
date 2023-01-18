import { Component, OnInit, Inject } from '@angular/core';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/entities/products';
import { NavigationExtras, Router } from '@angular/router';
import { ProductConfirmationComponent } from '../product-confirmation/product-confirmation.component';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  productNew: any;
  formAdd!:FormGroup;

  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, 
  private dialogRef: MatDialogRef<AddProductsComponent>, private productsService: ProductsService, 
  private formBuilder:FormBuilder, private dialog: MatDialog){
  
  }
  ngOnInit(): void {

  }

  productNuevo = new FormGroup({
    Codigo: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Precio: new FormControl('', Validators.required),
    Categoria: new FormControl('', Validators.required),
    Estado: new FormControl('', Validators.required),
    Descripcion: new FormControl('', Validators.required)
  })

  onSubmit() {    
     let objToSend: NavigationExtras = {
    queryParams: {
      Codigo: this.productNuevo.value.Codigo,
      Nombre: this.productNuevo.value.Nombre,
      Precio: this.productNuevo.value.Precio,
      Categoria: this.productNuevo.value.Categoria,
      Estado: this.productNuevo.value.Estado,
      Descripcion: this.productNuevo.value.Descripcion,
    },
    skipLocationChange: false,
    fragment: 'top'
  };
 
};
redirecTo(uri: string) {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri]));
}
OpenProductAdd(element: any) {
  this.dialog.open(AddProductsComponent, {
    width: '50%',
    data: {
      Product: element
    }
  });
}

cancel() {
  this.dialogRef.close();
}

}