import { Injectable } from "@angular/core";
import { User } from "src/app/entities/users";
import { SignInRequest } from "./requests/sign-in.request";
import { SignUpRequest } from "./requests/sign-up.request";

import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "./responses/auth.response";
import { environment } from "src/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	public authenticationKey: string = "authenticatedUser";
	public tokenKey: string = "token";

	private baseUrl: string = `${environment.endpoint}api/authentication`;

	constructor(private http: HttpClient) {}

	signIn(signInRequest: SignInRequest) {
		return this.http.post(`${this.baseUrl}/login`, signInRequest);
	}

	signUp(signUpRequest: SignUpRequest) {
		return this.http.post(`${this.baseUrl}/register`, signUpRequest);
	}

	signOut(): void {
		localStorage.removeItem(this.authenticationKey);
		localStorage.removeItem(this.tokenKey);
	}

	saveUserInLocalStorage(data: AuthResponse) {
		let payload: Payload = {
			id: data.userID,
			email: data.userEmail,
			rol: data.userRole,
		};
		localStorage.setItem(this.authenticationKey, JSON.stringify(payload));
		localStorage.setItem(this.tokenKey, data.accessToken);
	}

	userIsAdmin(): boolean {
		if (localStorage.getItem(this.authenticationKey) === null) {
			return false;
		}

		let user: Payload = JSON.parse(
			localStorage.getItem(this.authenticationKey)!,
		);

		return user.rol === "ADMIN";
	}

	userIsClient(): boolean {
		if (localStorage.getItem(this.authenticationKey) === null) {
			return false;
		}

		let user: Payload = JSON.parse(
			localStorage.getItem(this.authenticationKey)!,
		);

		return user.rol === "USER";
	}

	userIsLogged(): boolean {
		return this.authenticationKey in localStorage;
	}

	getUserFromLocalStorage(): User | undefined {
		// TODO: Usar servicio
		let payload: Payload = JSON.parse(
			localStorage.getItem(this.authenticationKey)!,
		);
		let user: User = {
			id: payload.id,
			email: payload.email,
			rol: payload.rol,
			name: "",
			lastname: "",
			password: "",
		};
		return user;
	}
}

export interface Payload {
	id: number;
	email: string;
	rol: "USER" | "ADMIN";
}
