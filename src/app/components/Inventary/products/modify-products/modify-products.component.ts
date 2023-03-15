import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/entities/products';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { ProductConfirmationComponent } from '../product-confirmation/product-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/entities/category';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-modify-products',
  templateUrl: './modify-products.component.html',
  styleUrls: ['./modify-products.component.css']
})
export class ModifyProductsComponent {
  productOld: any;
  productNew: any;
  formModify!: FormGroup;
  categoryControl = new FormControl<Category | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  categorias: any;
  suscription!: Subscription;

  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModifyProductsComponent>, private _productsService: ProductsService,
    private formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.formModify = this.formBuilder.group({
      //Codigo: ['', Validators.required],
      Nombre: ['', Validators.required],
      Precio: ['', Validators.required],
      Categoria: ['', Validators.required],
      //Estado: ['', Validators.required],
      Descripcion: ['', Validators.required]
    });
    this._productsService.GetCategory().subscribe((data: any) => {
      this.categorias = data;
    });
    if (this.data) {
      //this.formModify.controls['Codigo'].setValue(this.data.Product.Id),
      this.formModify.controls['Nombre'].setValue(this.data.Product.Nombre),
      this.formModify.controls['Precio'].setValue(this.data.Product.Precio),
      this.formModify.controls['Categoria'].setValue(this.data.Categoria),
      this.formModify.controls['Descripcion'].setValue(this.data.Product.Descripcion)
    }
  }
  onSubmit() {

    const producto: Product = {
      Id: this.data.Product.Id,
      Nombre: this.formModify.value.Nombre,
      Precio: this.formModify.value.Precio,
      Categoria: this.formModify.value.Categoria,
      Estado: this.formModify.value.Estado,
      Descripcion: this.formModify.value.Descripcion,
      ImagenUrl: ""
    };

    this._productsService.modifyProduct(producto).subscribe((data: any) => {
      this.dialogRef.close();
      this._snackBar.open('El Producto ' + this.data.Product.Id + ' fue modificado con éxito', '', {
        duration: 1500,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
      this.redirecTo('/adm-productos/view');
    },
      (errorData) => alert("Error al Insertar Usuario" + errorData)
    );
  }

  openConfirmation(text: string) {
    this.dialog.open(ProductConfirmationComponent, {
      width: '35%', data: { text: text }
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
