import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users';
import { UsersService } from '../users/users.service';
import { SignInRequest } from './requests/sign-in.request';
import { SignUpRequest } from './requests/sign-up.request';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './responses/auth.response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticationKey: string = "authenticatedUser";
  public tokenKey: string = "token";

  private baseUrl: string = 'http://localhost:5000/api/authentication';

  constructor(private userService: UsersService, private http: HttpClient) { }

  signIn(signInRequest: SignInRequest) {
    return this.http.post(`${this.baseUrl}/login`, signInRequest);
  }

  signUp(signUpRequest: SignUpRequest) {
    return this.http.post(`${this.baseUrl}/register`, signUpRequest);
  }

  signOut(): void {
    localStorage.removeItem(this.authenticationKey);
  }

  saveUserInLocalStorage(data: AuthResponse) {
    let payload: Payload = {
      id: data.userID,
      email: data.userEmail,
      rol: data.userRole
    }
    localStorage.setItem(this.authenticationKey, JSON.stringify(payload));
    localStorage.setItem(this.tokenKey, JSON.stringify(data.accessToken));
  }

  userIsAdmin(): boolean {
    if (localStorage.getItem(this.authenticationKey) === null) {
      return false;
    }

    let user: Payload = JSON.parse(localStorage.getItem(this.authenticationKey)!);

    return user.rol === "ADMIN";
  }

  userIsClient(): boolean {
    if (localStorage.getItem(this.authenticationKey) === null) {
      return false;
    }

    let user: Payload = JSON.parse(localStorage.getItem(this.authenticationKey)!);

    return user.rol === "USER";
  }

  userIsLogged(): boolean {
    return this.authenticationKey in localStorage;
  }

  getUserFromLocalStorage(): User | undefined {
    let payload: Payload = JSON.parse(localStorage.getItem(this.authenticationKey)!);
    let user: User | undefined = this.userService.getUserById(payload.id);
    if (user === undefined) {
      throw new Error('El usuario no existe');
    }
    return user;
  }

}

export interface Payload {
  id: number;
  email: string;
  rol: string;
}
