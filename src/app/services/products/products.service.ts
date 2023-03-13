import { Injectable } from '@angular/core';
import { Product } from 'src/app/entities/products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviorenments/enviorenment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public shoppingCartKey: string = "shoppingCart";
  baseUrl: string = environment.endpoint+'api/producto/';
  base: string = environment.endpoint+ 'api/categoria/';
  private _refresh$ = new Subject<void>();
  ProductData: Product[] = []
   
  constructor(private http: HttpClient) { }
  get refresh$(){
    return this._refresh$;
  }

  getDatos(){
    return this.http.get(this.baseUrl+"getall");
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

  deleteProduct(id: any) {
    return this.http.put(this.baseUrl+"Eliminar/"+id, id);
  }
  
  GetCategory(){
    return this.http.get(this.base+"getall");
  }



}
