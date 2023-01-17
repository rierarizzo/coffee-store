import { Injectable } from '@angular/core';
import { SignInRequest } from './requests/sign-in.request';
import { SignUpRequest } from './requests/sign-up.request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticationKey: string = "authenticatedUser";

  signIn(signInRequest: SignInRequest): void {
    // TODO: Implementación del método
  }

  signUp(signUpRequest: SignUpRequest): void {
    // TODO: Implementación del método
  }

  signOut(): void {
    // TODO: Implementación del método
  }


}
