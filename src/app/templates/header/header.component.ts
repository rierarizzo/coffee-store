import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    protected authService: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    Swal.default.fire({
      title: '¿Estás seguro que deseas cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.signOut();
        this.router.navigate(['/']);
      }
    })
  }

}
