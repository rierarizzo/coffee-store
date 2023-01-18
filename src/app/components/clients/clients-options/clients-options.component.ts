import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-clients-options',
  templateUrl: './clients-options.component.html',
  styleUrls: ['./clients-options.component.css']
})

export class ClientsOptionsComponent implements OnInit {
  icon_profile: string = "../../../../assets/icons-menu/profile.gif";
  icon_update: string = "../../../../assets/icons-menu/settings.gif";
  icon_sale: string = "../../../../assets/icons-menu/sale.gif";
  icon_log_out: string = "../../../../assets/icons-menu/logout.png";
  ngOnInit() {

  }
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
