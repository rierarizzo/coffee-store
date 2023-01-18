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
      Imagen: 'https://www.shutterstock.com/image-photo/cappuccino-frappe-oreo-600w-675357304.jpg'
    },
    {
      Codigo: 'BC02',
      Nombre: ' Expreso Doble ',
      Precio: 5.50,
      Categoria: 'Bebidas Calientes',
      Estado: 'Disponible',
      Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: 'https://dam.cocinafacil.com.mx/wp-content/uploads/2013/04/cafe-espresso.jpg'
    },
    {
      Codigo: 'BC03',
      Nombre: ' Americano ',
      Precio: 2.50,
      Categoria: 'Bebidas Calientes',
      Estado: 'Activo',
      Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: 'https://cdn.buttercms.com/AB7ud4YSE6nmOX0iGlgA'
    },
    {
      Codigo: 'BF04',
      Nombre: ' Mocca frio ',
      Precio: 3.50,
      Categoria: 'Bebidas Frias',
      Estado: 'Disponible',
      Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: 'https://monkites.com/wp-content/uploads/frappe-moka2.jpg'
    },
    {
      Codigo: 'BF05',
      Nombre: ' Latte frio ',
      Precio: 3.50,
      Categoria: 'Bebidas Frias',
      Estado: 'Disponible',
      Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
      Imagen: 'https://culturacafeina.com/wp-content/uploads/2020/07/bebida-fria-de-cafe-683x1024.jpg'
    },
    {
      Codigo: 'BF06',
      Nombre: ' Frappe Fresa ',
      Precio: 3.50,
      Categoria: 'Bebidas Frias',
      Estado: 'Disponible',
      Descripcion: 'Jarabe de Fresa y la mitad de jarabe de caramelo',
      Imagen: 'https://www.mdemi.com/wp-content/uploads/2020/06/Frappuccino-de-fresa.jpg'
    },
    {
      Codigo: 'BF07',
      Nombre: ' Frappe Oreo ',
      Precio: 3.50,
      Categoria: 'Bebidas Frias',
      Estado: 'Disponible',
      Descripcion: 'Jarabe de Oreo y la mitad de jarabe de chocolate ',
      Imagen: 'https://media.vogue.mx/photos/5ea76496a9c5e800087bd4cb/master/pass/batido--galletas-oreo.jpg'
    },
    {
      Codigo: 'POS08',
      Nombre: ' Porción de Cheesecake de Mora',
      Precio: 2.00,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Delicioso postre de chocolate relleno de almendras ',
      Imagen: 'https://www.recetasnestle.com.co/sites/default/files/srh_recipes/8fba0813a37afcd8febecfcac05800f4.jpg'
    },
    {
      Codigo: 'POS09',
      Nombre: ' Porción de Torta Mojada de chocolate ',
      Precio: 2.00,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Porcion de pastel de chocolate mojada y chispas de chocolate blanco',
      Imagen: 'https://images.getduna.com/b0833163-6dda-48ff-97c3-213e9fd937f7/7403b37569665088_domicilio_32722_744x744.png?d=600x600&format=webp'
    },
    {
      Codigo: 'POS10',
      Nombre: ' Porción de Torta de Manjar y Nuez ',
      Precio: 2.00,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Porcion de pastel de majar y chispas de nuez',
      Imagen: 'https://s1.eestatic.com/2017/02/13/cocinillas/cocinillas_193495389_116293001_1706x960.jpg'
    },
    {
      Codigo: 'POS11',
      Nombre: ' Muffin Chocochip ',
      Precio: 1.00,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Muffin con chispas de chocolate',
      Imagen: 'https://static.onecms.io/wp-content/uploads/sites/19/2011/04/08/chocolate-chip-muffins-ck-2000.jpg'
    },
    {
      Codigo: 'POS12',
      Nombre: 'Brownie ',
      Precio: 1.50,
      Categoria: 'Postres',
      Estado: 'Disponible',
      Descripcion: 'Muffin con chispas de chocolate',
      Imagen: 'https://img-global.cpcdn.com/recipes/d39f2b7ae1fb30b6/1200x630cq70/photo.jpg'
    },

  ]

  getDatos(): Product[] {
    return this.ProductData;
  }
  AddProduct(addproduct: Product){
    this.ProductData.unshift(addproduct);
  }
  modifyProduct(productNew: Product, productOld: Product) {
    this.ProductData[this.ProductData.indexOf(productOld)] = productNew;
  }
  Modificar(data: Product) {
    var Codigo = this.ProductData.find(producto => producto.Codigo == data.Codigo)
    if (data.Codigo == Codigo?.Codigo) {
      var index = this.ProductData.findIndex(producto => producto.Codigo == data.Codigo)
      this.ProductData[index] = data
    }
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

  getProductFromLocalStorage(): string {
    return localStorage.getItem(this.shoppingCartKey)!;
  }

  getProductByCode(code: string): Product | undefined {
    return this.ProductData.find((product) => {
      return product.Codigo === code;
    })
  }

  getProductsByCodes(codes: string): Product[] {
    let productsToReturn: Product[] = [];

    if (codes === null) {
      console.log("No hay productos");
      return productsToReturn;
    }

    if (!codes.includes(",")) {
      productsToReturn.push(this.getProductByCode(codes)!);
      return productsToReturn;
    }

    let codesArray: string[] = codes.split(",");

    for (let code of codesArray) {
      productsToReturn.push(this.getProductByCode(code)!);
    }

    return productsToReturn;
  }

  deleteProductInLocalStorage(code: string) {
    if (localStorage.getItem(this.shoppingCartKey) === null) {
      console.log("El carro está vacío");
      return;
    }

    if (!localStorage.getItem(this.shoppingCartKey)!.includes(",")) {
      console.log("El carro solo tiene un elemento");
      localStorage.removeItem(this.shoppingCartKey);
      return;
    }

    let codes: string[] = localStorage.getItem(this.shoppingCartKey)!.split(",");

    console.log("Todos los códigos guardados en localStorage -> " + codes);

    let index = codes.indexOf(code);

    console.log("Index del código a eliminar -> " + index);

    codes.splice(index, 1);

    localStorage.removeItem(this.shoppingCartKey);
    for (let code of codes) {
      this.saveProductInShoppingCart(code);
    }
  }

  deleteProduct(product: Product) {
    this.ProductData.splice(this.ProductData.indexOf(product), 1)
  }

}
