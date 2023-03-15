import { Component, OnInit, Inject } from '@angular/core';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/entities/products';
import { NavigationExtras, Router } from '@angular/router';
import { ProductConfirmationComponent } from '../product-confirmation/product-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/entities/category';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  productNew: any;
  formAdd!: FormGroup;
  categoryControl = new FormControl<Category | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  categorias: any;

  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddProductsComponent>, private _productsService: ProductsService,
    private formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.formAdd = this.formBuilder.group({
      //Codigo: ['', Validators.required],
      Nombre: ['', Validators.required],
      Precio: ['', Validators.required],
      Categoria: ['', Validators.required],
      //Estado: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Imagen: ['', Validators.required]
    }),
      this._productsService.GetCategory().subscribe((data: any) => {
        this.categorias = data;
      });
  }

  productAdd() {
    const conspro: Product = {
      Id: this.formAdd.value.Codigo,
      Nombre: this.formAdd.value.Nombre,
      Precio: this.formAdd.value.Precio,
      Categoria: this.formAdd.value.Categoria,
      Estado: this.formAdd.value.Estado,
      Descripcion: this.formAdd.value.Descripcion,
      ImagenUrl: this.formAdd.value.Imagen
    }

    this._productsService.AddProduct(conspro).subscribe((data: any) => {
      this.dialogRef.close();
      this._snackBar.open('El Producto fue agregado con éxito', '', {
        duration: 1500,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
      this.redirecTo('/adm-productos/view');
    },
      (errorData) => alert("Error al Insertar Usuario" + errorData)
    );
  }

  redirecTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  cancel() {
    this.dialogRef.close();
  }

}