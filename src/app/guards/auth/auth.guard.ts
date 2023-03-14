import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { AuthResponse } from "src/app/services/authentication/responses/auth.response";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	private baseUrl: string = "http://localhost:5000/api/authentication";
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
		this.http
			.post(`${this.baseUrl}/refresh-token`, "", {
				headers: new HttpHeaders().set("Authorization", tokenWithBearer),
			})
			.subscribe({
				next: (v) => {
					this.authenticationService.saveUserInLocalStorage(v as AuthResponse);
					this.isAuthenticated = true;
				},
				error: () => {
					this.authenticationService.signOut();
					this.router.navigate(["/"]);
				},
			});

		console.log(`Está autenticado? -> ${this.isAuthenticated}`);
		return this.isAuthenticated;
	}
}
