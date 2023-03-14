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
    private dialogRef: MatDialogRef<AddProductsComponent>, private productsService: ProductsService,
    private formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.formAdd = this.formBuilder.group({
      Codigo: ['', Validators.required],
      Nombre: ['', Validators.required],
      Precio: ['', Validators.required],
      Categoria: ['', Validators.required],
      Estado: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Imagen: ['', Validators.required]
    }),
      this.productsService.GetCategory().subscribe((data: any) => {
        this.categorias = data;
        console.log(this.categorias)
        console.log(data);
      });
  }

  productAdd() {
    const conspro: Product = {
      Codigo: this.formAdd.value.Codigo,
      Nombre: this.formAdd.value.Nombre,
      Precio: this.formAdd.value.Precio,
      Categoria: this.formAdd.value.Categoria,
      Estado: this.formAdd.value.Estado,
      Descripcion: this.formAdd.value.Descripcion,
      Imagen: this.formAdd.value.Imagen
    }
    this._snackBar.open('El Producto fue agregado con éxito', '', {
      duration: 1500,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    })

    this.router.navigate(['/'])
      .then(() => this.router.navigate(['/adm-productos/view'], { state: { editarDatos: this.productsService.AddProduct(conspro) } }))

    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

}