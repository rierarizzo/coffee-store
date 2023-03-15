import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersConfirmationComponent } from '../users-confirmation/users-confirmation.component';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.css']
})

export class UsersDeleteComponent {

  icon_gif: string = "../../../../assets/icons-gif/bin.gif";
  nombre = this.data.user.Nombre;
  Id = this.data.user.Id;

  constructor(private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UsersDeleteComponent>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onSubmit() {
    this.dialogRef.close();
    this.userService.deleteUser(this.Id).subscribe((data:any)=>{
      this.openConfirmation('Eliminación de Usuario');
      this.redirecTo('/adm-users');
    },
    (errorData)=> alert("Error al eliminar Proveedor"+ errorData)
    );    
  }

  openConfirmation(text: string) {
    this.dialog.open(UsersConfirmationComponent, {
      width: '35%', data: { text: text, rutaGif: this.icon_gif }
    })
  }

  redirecTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  cancel() {
    this.dialogRef.close();
  }
}
