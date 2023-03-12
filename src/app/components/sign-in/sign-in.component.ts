import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";

import { SignInRequest } from "../../services/authentication/requests/sign-in.request";

import * as Swal from "sweetalert2";
import { Router } from "@angular/router";
import { SignInResponse } from "src/app/services/authentication/responses/sign-in.response";

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
		private authenticationService: AuthenticationService,
		private router: Router,
	) {}

	ngOnInit() {
		this.signInForm = this.fb.group({
			email: new FormControl(
				"",
				Validators.compose([Validators.email, Validators.required]),
			),
			contrasena: new FormControl("", Validators.required),
		});
	}

	onSubmit() {
		this.submitted = true;
		if (this.signInForm.valid) {
			let signInRequest: SignInRequest = this.signInForm.value;

			this.authenticationService.signIn(signInRequest).subscribe(
				(data) => {
					console.log(data);
          this.authenticationService.saveUserInLocalStorage(data as SignInResponse);
					this.router.navigate(["/"]);
				},
				(err) => {
					Swal.default.fire(
						"Error",
						"Los datos ingresados no son correctos",
						"error",
					);
				},
			);
		} else {
			Swal.default.fire(
				"Error",
				"Los datos ingresados no son correctos",
				"error",
			);
		}
	}

	get signInFormControl() {
		return this.signInForm.controls;
	}
}
function saveUserInLocalStorage(data: Object) {
  throw new Error("Function not implemented.");
}

