import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SignUpRequest } from 'src/app/services/authentication/requests/sign-up.request';

import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      let signUpRequest: SignUpRequest = this.signUpForm.value;
      this.authenticationService.signUp(signUpRequest);
    } else {
      Swal.default.fire(
        'Error',
        'Los datos ingresados no son correctos',
        'error'
      )
    }
  }

  get signUpFormControl() {
    return this.signUpForm.controls;
  }

}
