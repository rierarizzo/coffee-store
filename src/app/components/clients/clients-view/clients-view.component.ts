import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-users-clients',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.css']
})
export class ClientsViewComponent {
  user: any;

  constructor(private authService: AuthenticationService) {
    this.user = this.authService.getUserFromLocalStorage();
    this.formModify.setValue({
      idUser: this.user.idUser,
      name: this.user.name,
      lastname: this.user.lastname,
      email: this.user.email
    });
  }

  formModify = new FormGroup({
    idUser: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });
}
