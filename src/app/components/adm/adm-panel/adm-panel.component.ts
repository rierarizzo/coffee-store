import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-panel',
  templateUrl: './adm-panel.component.html',
  styleUrls: ['./adm-panel.component.css']
})
export class AdmPanelComponent {
  icon_profile: string = "../../../../assets/icons-menu/profile.gif";
  icon_update: string = "../../../../assets/icons-menu/settings.gif";
  icon_sale: string = "../../../../assets/icons-menu/sale.gif";
  icon_log_out: string = "../../../../assets/icons-menu/logout.png";
  icon_products:string ="../../../../assets/icons-menu/cutlery.gif";

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
