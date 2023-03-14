import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { SignUpRequest } from "src/app/services/authentication/requests/sign-up.request";
import { AuthResponse } from "src/app/services/authentication/responses/auth.response";

import * as Swal from "sweetalert2";

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
		private authenticationService: AuthenticationService,
		private router: Router,
	) {}

	ngOnInit() {
		this.signUpForm = this.fb.group({
			nombres: new FormControl("", Validators.required),
			apellidos: new FormControl("", Validators.required),
			email: new FormControl(
				"",
				Validators.compose([Validators.email, Validators.required]),
			),
			contrasena: new FormControl("", Validators.required),
		});
	}

	onSubmit() {
		this.submitted = true;
		if (this.signUpForm.valid) {
			let signUpRequest: SignUpRequest = this.signUpForm.value;

			this.authenticationService.signUp(signUpRequest).subscribe({
				next: (v) => {
					this.authenticationService.saveUserInLocalStorage(v as AuthResponse);
					this.router.navigate(["/"]);
				},
				error: (v) => {
					console.log(v);
					if (v.status === 401) {
						this.showError("Credenciales incorrectas");
						return;
					}
					this.showError("Ha ocurrido un error inesperado");
				},
			});
		} else {
			this.showError("Los datos ingresados no son correctos");
		}
	}

	get signUpFormControl() {
		return this.signUpForm.controls;
	}

	private showError(msg: string) {
		Swal.default.fire("Error", msg, "error");
	}
}
