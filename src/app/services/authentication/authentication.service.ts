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
    this.router.navigate(["/"]);
  }

  signUp(signUpRequest: SignUpRequest): void {
    // TODO: Implementación del método
  }

  signOut(): void {
    // TODO: Implementación del método
  }


}
