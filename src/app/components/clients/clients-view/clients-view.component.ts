import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-clients',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.css']
})
export class ClientsViewComponent implements OnInit{
  user: any;
  suscription!: Subscription;

  constructor(private authService: AuthenticationService,
    private _userService: UsersService) {
    this.user = this.authService.getUserFromLocalStorage();
  }

  formModify = new FormGroup({
    idUser: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.obtenerdatos();
    this.suscription = this._userService.refresh$.subscribe(() => {
      this.obtenerdatos();
    }
    );
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  obtenerdatos():void {
    this._userService.getDatosId(this.user.id).subscribe((data: any) => {
      this.formModify.setValue({
        idUser: data[0]['Cedula'],
        name:  data[0]['Nombres'],
        lastname:  data[0]['Apellidos'],
        email:  data[0]['Email']
      });
    });
    
  }
}
