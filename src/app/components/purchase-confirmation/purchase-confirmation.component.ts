import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/entities/products';
import { User } from 'src/app/entities/users';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.css']
})
export class PurchaseConfirmationComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price'];
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<PurchaseConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    let products: Product[] = this.productService.getProductsByCodes(
      this.productService.getProductFromLocalStorage()
    );

    let productElements: ProductElement[] = [];
    for (let product of products) {
      productElements.push(this.mapProductEntityToTablePresentation(product));
    }

    this.dataSource = productElements;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  mapProductEntityToTablePresentation(product: Product): ProductElement {
    let productElement: ProductElement = {
      name: product.Nombre,
      description: product.Descripcion,
      price: product.Precio
    }

    return productElement;
  }
  
  getTotalAmount(): number {
    let total: number = 0;

    for (let e of this.dataSource) {
      total += e.price;
    }

    return total;
  }
}

export interface DialogData {
  client: User;
  products: Product[];
}

export interface ProductElement {
  name: string;
  description: string;
  price: number;
}