import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users';
import { UsersService } from '../users/users.service';
import { SignInRequest } from './requests/sign-in.request';
import { SignUpRequest } from './requests/sign-up.request';

import * as Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UsersService, private router: Router) { }

  public authenticationKey: string = "authenticatedUser";

  signIn(signInRequest: SignInRequest): void {
    let user: User | undefined = this.userService.getUserByEmail(signInRequest.email);
    if (user === undefined) {
      Swal.default.fire(
        'Error',
        'El correo o la contraseña son incorrectos',
        'error'
      );
      return;
    }

    if (user.password !== signInRequest.password) {
      Swal.default.fire(
        'Error',
        'El correo o la contraseña son incorrectos',
        'error'
      );
      return;
    }

    console.log("Ingreso exitoso");

    let payload: Payload = {
      id: user.idUser,
      email: user.email,
      rol: user.rol
    }

    localStorage.setItem(this.authenticationKey, JSON.stringify(payload));
    this.router.navigate(["/"]);
  }

  signUp(signUpRequest: SignUpRequest): void {
    /* let user: User = {
      name: signUpRequest.name,
      email: signUpRequest.email,
      lastname: signUpRequest.surname,
      password: signUpRequest.password,
      rol: "Client"
    };

    try {
      this.userService.createUser(user);
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
      id: user.idUser,
      email: user.email,
      rol: user.rol
    }

    localStorage.setItem(this.authenticationKey, JSON.stringify(payload));
    this.router.navigate(["/"]); */
  }

  signOut(): void {
    // TODO: Implementación del método
  }


}

export interface Payload {
  id: string;
  email: string;
  rol: string;
}
