import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor() { }

  dataSource: any = [];
  displayedColumns: string[] = ['Cedula', 'Nombres', 'Apellidos', 'Correo', 'Rol']

  dummyData: User[] = [
    {
      idUser: '000000000',
      name: 'Keneth Danilo',
      lastname: 'Mero Minchala',
      email: 'admin@gmail.com',
      password: 'admin123',
      rol: 'A'
    },
    {
      idUser: '0151245245',
      name: 'Andrés Luis',
      lastname: 'Carvajal Lozano',
      email: 'andresito@gmail.com',
      password: 'pepitotrulo',
      rol: 'U'
    },
    {
      idUser: '0954658913',
      name: 'Jorge Luis',
      lastname: 'Charco Aguirre',
      email: 'jorgito@gmail.com',
      password: 'pepitotrulo',
      rol: 'U'
    },
    {
      idUser: '0957962158',
      name: 'Andrea Lisbeth',
      lastname: 'Romero Haro',
      email: 'andrea@gmail.com',
      password: 'pepitotrulo',
      rol: 'U'
    }
  ];

  isAdmin(user: User): boolean {
    return user.rol.charAt(0) == 'A';
  }

  createUser(user: User) {
    this.data.push(user);
  }

  getUsers(): User[] {
    return this.data;
  }

  modifyUser(userNew: User, userOld: User) {
    this.data[this.data.findIndex((us => us = userOld))] = userNew;
  }

  deleteUser(user: User) {
    this.data.splice(this.data.findIndex((us => us = user)), 1)
  }

}
