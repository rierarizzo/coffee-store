import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users';
import { UsersService } from '../users/users.service';
import { SignInRequest } from './requests/sign-in.request';
import { SignUpRequest } from './requests/sign-up.request';

import * as Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SignInResponse } from './responses/sign-in.response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UsersService, private router: Router, private http: HttpClient) { }

  public authenticationKey: string = "authenticatedUser";

  private baseUrl: string = 'http://localhost:5000/api/authentication';

  signIn(signInRequest: SignInRequest) {
    return this.http.post(`${this.baseUrl}/login`, signInRequest);
  }

  saveUserInLocalStorage(data: SignInResponse) {
    let payload: Payload = {
      id: data.userID,
      email: data.userEmail,
      rol: data.userRole
    }
    localStorage.setItem(this.authenticationKey, JSON.stringify(payload));
  }

  signUp(signUpRequest: SignUpRequest): void {
    let user: User = {
      name: signUpRequest.name,
      email: signUpRequest.email,
      lastname: signUpRequest.surname,
      password: signUpRequest.password,
      rol: "Client"
    };

    try {
      user = this.userService.createUser(user);
    } catch (e) {
      Swal.default.fire(
        'Error',
        'Ha ocurrido un error inesperado',
        'error'
      );
      return;
    }
    
    console.log("Ingreso exitoso");

    let payload: Payload = {
      id: user.id!,
      email: user.email,
      rol: user.rol
    }

    localStorage.setItem(this.authenticationKey, JSON.stringify(payload));
    this.router.navigate(["/"]);
  }

  signOut(): void {
    localStorage.removeItem(this.authenticationKey);
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
