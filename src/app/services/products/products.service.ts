import { Injectable } from "@angular/core";
import { Product } from "src/app/entities/products";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment/environment";
import { mergeMap, of, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
	public shoppingCartKey: string = "shoppingCart";
	baseUrl: string = `${environment.endpoint}api/producto/`;
	base: string = `${environment.endpoint}api/categoria/`;
	private _refresh$ = new Subject<void>();
	ProductData: Product[] = [];

	constructor(private http: HttpClient) {}

	get refresh$() {
		return this._refresh$;
	}

	getDatos() {
		return this.http.get(`${this.baseUrl}getall`).pipe(
			mergeMap((response) => {
				return of(response as Product[]);
			}),
		);
	}

	AddProduct(addproduct: Product) {
		/* this.ProductData.unshift(addproduct); */
		console.log(addproduct)
		return this.http.post(`${this.baseUrl}GetProductoInsertar/`,addproduct);
	}

	/* modifyProduct(productNew: Product, productOld: Product) {
		this.ProductData[this.ProductData.indexOf(productOld)] = productNew;
	} */

	modifyProduct(producto : Product) {
		console.log(producto)
		return this.http.post(`${this.baseUrl}GetProductoModificar/`,producto);
	}

	Modificar(data: Product) {
		let Codigo = this.ProductData.find(
			(producto) => producto.Codigo === data.Codigo,
		);
		if (data.Codigo === Codigo?.Codigo) {
			let index = this.ProductData.findIndex(
				(producto) => producto.Codigo === data.Codigo,
			);
			this.ProductData[index] = data;
		}
	}

	saveProductInShoppingCart(productCode: string) {
		if (this.shoppingCartKey in localStorage) {
			let productSavedInLocalStorage: string = localStorage.getItem(
				this.shoppingCartKey,
			)!;
			productCode = `${productSavedInLocalStorage},${productCode}`;

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
		});
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

		let codes: string[] = localStorage
			.getItem(this.shoppingCartKey)!
			.split(",");

		console.log(`Todos los códigos guardados en localStorage -> ${codes}`);

		let index = codes.indexOf(code);

		console.log(`Index del código a eliminar -> ${index}`);

		codes.splice(index, 1);

		localStorage.removeItem(this.shoppingCartKey);
		for (let code of codes) {
			this.saveProductInShoppingCart(code);
		}
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	deleteProduct(id: any) {
		return this.http.put(`${this.baseUrl}Eliminar/${id}`, id);
	}

	GetCategory() {
		return this.http.get(`${this.base}getall`);
	}
}
