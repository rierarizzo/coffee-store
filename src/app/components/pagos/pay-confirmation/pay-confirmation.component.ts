import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Product } from 'src/app/entities/products';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ProductsService } from 'src/app/services/products/products.service';

import * as Swal from 'sweetalert2';
//userOld:any; 
@Component({
  selector: 'app-pay-confirmation',
  templateUrl: './pay-confirmation.component.html',
  styleUrls: ['./pay-confirmation.component.css']
})

export class PayConfirmationComponent implements OnInit {

  authenticatedUser: any;
  products: any;

  /* Tabla */
  productDetailElements: ProductDetailElement[] = [];
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];
  dataSource: any;

  constructor(
    private authentication: AuthenticationService,
    private productService: ProductsService,
    private router: Router
  ) {
    this.authenticatedUser = this.authentication.getUserFromLocalStorage();

    console.log(this.authenticatedUser);
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('authenticatedUser'));

    this.products = this.productService.getProductsByCodes(
      this.productService.getProductFromLocalStorage()
    );

    for (let product of this.products) {
      this.productDetailElements.push(this.mapProductEntityToTablePresentation(product));
    }

    this.dataSource = this.productDetailElements;
  }

  mapProductEntityToTablePresentation(product: Product): ProductDetailElement {
    let productElement: ProductDetailElement = {
      code: product.Codigo,
      name: product.Nombre,
      price: product.Precio,
      canti: 1
    }

    return productElement;
  }

  aumentar(code: string) {
    let productDetail: ProductDetailElement = this.productDetailElements.find((productDetail, index) => {
      return productDetail.code === code
    })!;

    let index: number = this.productDetailElements.indexOf(productDetail);
    this.productDetailElements.splice(index, 1);
    productDetail.canti++;
    this.productDetailElements.push(productDetail);
  }

  disminuir(code: string) {
    let productDetail: ProductDetailElement = this.productDetailElements.find((productDetail, index) => {
      return productDetail.code === code
    })!;

    let index: number = this.productDetailElements.indexOf(productDetail);
    this.productDetailElements.splice(index, 1);
    productDetail.canti--;

    if (productDetail.canti < 1) {
      productDetail.canti = 1;
    }

    this.productDetailElements.push(productDetail);
  }

  sumaTotal(): number {
    let total: number = 0;

    for (let detail of this.productDetailElements) {
      total += detail.price * detail.canti;
    }

    return total;
  }

  realizarCompra() {
    Swal.default.fire({
      title: 'Compra realizada!',
      icon: 'success',
      timer: 1500
    }).then(() => {
      this.router.navigate(['/']);
    });
  }

}

export interface ProductDetailElement {
  code: string;
  name: string;
  price: number;
  canti: number;
}