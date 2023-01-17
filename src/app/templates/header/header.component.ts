import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PurchaseConfirmationComponent } from 'src/app/components/purchase-confirmation/purchase-confirmation.component';
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
    private router: Router,
    public dialog: MatDialog
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

  openDialog(): void {
    const dialogRef = this.dialog.open(PurchaseConfirmationComponent, {
      data: {name: "Max", animal: "Perro"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
