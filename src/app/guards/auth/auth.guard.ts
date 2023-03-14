import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { catchError, mergeMap, Observable, of } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { AuthResponse } from "src/app/services/authentication/responses/auth.response";
import { environment } from "src/environment/environment";

import * as Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	private baseUrl: string = `${environment.endpoint}api/authentication`;
	public tokenKey: string = "token";

	private isAuthenticated: boolean = false;

	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService,
		private router: Router,
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		let token = localStorage.getItem(this.tokenKey)!;
		let tokenWithBearer = `Bearer ${token}`;

		// En caso de que siga autenticado, refresca el token y permite el acceso,
		// caso contrario, redirige a la pantalla de login
		return this.http
			.post(`${this.baseUrl}/refresh-token`, "", {
				headers: new HttpHeaders().set("Authorization", tokenWithBearer),
			})
			.pipe(
				mergeMap((response) => {
					this.authenticationService.saveUserInLocalStorage(
						response as AuthResponse,
					);
					this.isAuthenticated = true;
					console.log(`Está autenticado? -> ${this.isAuthenticated}`);
					return of(this.isAuthenticated);
				}),
				catchError((error) => {
					console.error(error);
					this.authenticationService.signOut();
					this.router.navigate(["/"]);
					Swal.default.fire({
						position: "top-end",
						icon: "error",
						title: "Tu sesión ha caducado",
						showConfirmButton: false,
						timer: 1500,
					});
					return of(false);
				}),
			);
	}
}
