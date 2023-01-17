import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PurchaseConfirmationComponent } from 'src/app/components/purchase-confirmation/purchase-confirmation.component';
import { Product } from 'src/app/entities/products';
import { User } from 'src/app/entities/users';
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
    let user: User = this.authService.getUserFromLocalStorage()!;
    let products: Product[] = [
      {
        Codigo: 'BC01',
        Nombre: ' CAPUCHINO OREO ',
        Precio: '4.50',
        Categoria: 'Bebidas Calientes',
        Estado: 'Disponible',
        Descripcion: 'Capuchino de galletas oreo y preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
        Imagen: ''
      },
      {
        Codigo: 'BC02',
        Nombre: ' Expreso Doble ',
        Precio: '5.50',
        Categoria: 'Bebidas Calientes',
        Estado: 'Disponible',
        Descripcion: 'Preparado con café 100% puro soluble nescafé clásico y leche evaporada ',
        Imagen: ''
      }
    ]

    const dialogRef = this.dialog.open(PurchaseConfirmationComponent, {
      data: {client: user, products: products},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
