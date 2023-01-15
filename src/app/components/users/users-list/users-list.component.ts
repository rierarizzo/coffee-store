import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/entities/users';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  dataSource:User[]=[];

  constructor(private usersService:UsersService){
    this.dataSource = usersService.getUsers();
  }

  displayedColumns: string[] = ['idUser', 'name', 'lastname', 'email', 'rol', 'accion'];


}
