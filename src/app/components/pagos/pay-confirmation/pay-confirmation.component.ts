import { Component, OnInit } from '@angular/core';
import { left } from '@popperjs/core';
import { Product } from 'src/app/entities/products';
import { User } from 'src/app/entities/users';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ProductsService } from 'src/app/services/products/products.service';
//userOld:any; 
@Component({
  selector: 'app-pay-confirmation',
  templateUrl: './pay-confirmation.component.html',
  styleUrls: ['./pay-confirmation.component.css']
})

export class PayConfirmationComponent implements OnInit {
  authenticatedUser: any;
  products:any;
  constructor(private authentication:AuthenticationService ,private productService: ProductsService) {
    this.authenticatedUser = this.authentication.getUserFromLocalStorage(); 
    this.products = this.productService.getProductsByCodes(
      this.productService.getProductFromLocalStorage()
    );
    console.log(this.authenticatedUser);
  }
  ngOnInit(): void {
    console.log(localStorage.getItem('authenticatedUser'));

  }


  mapProductEntityToTablePresentation(product: ProductDetailElement): ProductDetailElement {
    let productElement: ProductDetailElement = {
      code: product.Codigo,
      name: product.Nombre,
      price: product.Precio,
      canti: product
    }

    return productElement;
  }
  
  cantidad: Number = 0;

  aumentar() {
   // this.cantidad++;
  }

}

export interface ProductDetailElement {
  code: string;
  name: string;
  price: number;
  canti: number;

}