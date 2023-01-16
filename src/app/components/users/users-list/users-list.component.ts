import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { UsersService } from 'src/app/services/users/users.service';
import { UsersModifyComponent } from '../users-modify/users-modify.component';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  dataSource: User[] = [];
  rol: string = "";

  constructor(private usersService: UsersService, private dialog: MatDialog) {
    this.dataSource = this.usersService.getUsers();
  }

  displayedColumns: string[] = ['idUser', 'name', 'lastname', 'email', 'rol', 'accion'];

  openUserModify(element: User) {
    this.dialog.open(UsersModifyComponent, {
      width: '50%',
      data: {
        user: element
      }
    });
  }

  openUserDelete(element: User) {
    this.dialog.open(UsersDeleteComponent, {
      width: '50%',
      data: {
        user: element
      }
    });
  }
}
