import { Component } from '@angular/core';
import { Product } from 'src/app/entities/products';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  defaultImagePath: string = "../../../assets/default-image.png";

  allProducts: Product[];

  constructor(private productService: ProductsService) {
    this.allProducts = productService.ProductData;
  }

  addToCart(product: Product) {
    this.productService.saveProductInShoppingCart(product.Codigo);
  }

}
