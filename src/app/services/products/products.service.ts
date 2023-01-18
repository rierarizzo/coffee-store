import { Injectable } from '@angular/core';
import { Product } from 'src/app/entities/products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public shoppingCartKey: string = "shoppingCart";

  ProductData: Product[] = [
    {
      Codigo: 'BC01',
      Nombre: ' CAPUCHINO OREO ',
      Precio: 4.50,
      Categoria: 'Bebidas Calientes',
      Estado: 'Disponible',
      Descripcion: 'Capuchino de galletas oreo y preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: ''
    },
    {
      Codigo: 'BC02',
      Nombre: ' Expreso Doble ',
      Precio: 5.50,
      Categoria: 'Bebidas Calientes',
      Estado: 'Disponible',
      Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: ''
    },
    {
      Codigo: 'BC03',
      Nombre: ' Americano ',
      Precio: 2.50,
      Categoria: 'Bebidas Calientes',
      Estado: 'Activo',
      Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: ''
    },
    {
      Codigo: 'BF04',
      Nombre: ' Mocca frio ',
      Precio: 3.50,
      Categoria: 'Bebidas Frias',
      Estado: 'Disponible',
      Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: ''
    },
    {
      Codigo: 'BF05',
      Nombre: ' Latte frio ',
      Precio: 3.50,
      Categoria: 'Bebidas Frias',
      Estado: 'Disponible',
      Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: ''
    },
    {
      Codigo: 'BF06',
      Nombre: ' Frappe Fresa ',
      Precio: 3.50,
      Categoria: 'Bebidas Frias',
      Estado: 'Disponible',
      Descripcion: 'Jarabe de Fresa y la mitad de jarabe de caramelo',
      Imagen: ''
    },
    {
      Codigo: 'BF07',
      Nombre: ' Frappe Oreo ',
      Precio: 3.50,
      Categoria: 'Bebidas Frias',
      Estado: 'Disponible',
      Descripcion: 'Jarabe de Oreo y la mitad de jarabe de chocolate ',
      Imagen: ''
    },
    {
      Codigo: 'POS08',
      Nombre: ' Porción de Cheesecake de Mora',
      Precio: 2.00,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Delicioso postre de chocolate relleno de almendras ',
      Imagen: ''
    },
    {
      Codigo: 'POS09',
      Nombre: ' Porción de Torta Mojada de chocolate ',
      Precio: 2.00,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Porcion de pastel de chocolate mojada y chispas de chocolate blanco',
      Imagen: ''
    },
    {
      Codigo: 'POS10',
      Nombre: ' Porción de Torta de Manjar y Nuez ',
      Precio: 2.00,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Porcion de pastel de majar y chispas de nuez',
      Imagen: ''
    },
    {
      Codigo: 'POS11',
      Nombre: ' Muffin Chocochip ',
      Precio: 1.00,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Muffin con chispas de chocolate',
      Imagen: ''
    },
    {
      Codigo: 'POS12',
      Nombre: 'Brownie ',
      Precio: 1.50,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Muffin con chispas de chocolate',
      Imagen: ''
    },

  ]

  getDatos(): Product[] {
    return this.ProductData;
  }
  
  modifyProduct(productNew: Product, productOld: Product) {
    this.ProductData[this.ProductData.indexOf(productOld)] = productNew;
  }

  saveProductInShoppingCart(productCode: string) {
    if (this.shoppingCartKey in localStorage) {
      let productSavedInLocalStorage: string = localStorage.getItem(this.shoppingCartKey)!;
      productCode = productSavedInLocalStorage + "," + productCode

      localStorage.setItem(this.shoppingCartKey, productCode);
    } else {
      localStorage.setItem(this.shoppingCartKey, productCode);
    }
  }

  deleteProduct(product:Product){
    this.ProductData.splice(this.ProductData.indexOf(product),1)
   }

}
