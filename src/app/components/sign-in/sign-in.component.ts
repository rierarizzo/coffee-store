import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { SignInRequest } from '../../services/authentication/requests/sign-in.request';

import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signInForm.valid) {
      let signInRequest: SignInRequest = this.signInForm.value;
      this.authenticationService.signIn(signInRequest);
    } else {
      Swal.default.fire(
        'Error en credenciales',
        'Tu correo o contraseña son incorrectos',
        'error'
      )
    }
  }

  get signInFormControl() {
    return this.signInForm.controls;
  }

}
