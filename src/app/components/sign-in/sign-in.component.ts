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
import { AuthResponse } from "src/app/services/authentication/responses/auth.response";

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

			this.authenticationService.signIn(signInRequest).subscribe({
				next: (v) => {
					this.authenticationService.saveUserInLocalStorage(v as AuthResponse);
					this.router.navigate(["/"]);
				},
				error: (v) => {
					if (v.status === 401) {
						this.showError("Credenciales incorrectas");
						return;
					}
					if (v.status === 404) {
						this.showError("El usuario ingresado no existe");
						return;
					}
					this.showError("Ha ocurrido un error inesperado");
				},
			});
		} else {
			this.showError("Los datos ingresados no son correctos");
		}
	}

	get signInFormControl() {
		return this.signInForm.controls;
	}

	private showError(msg: string) {
		Swal.default.fire("Error", msg, "error");
	}
}
