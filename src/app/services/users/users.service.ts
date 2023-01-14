import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor() { }

  isAdmin(user:User):boolean{
    return user.rol == 'A';
  }

  createUser(user:User){

  }

  getUsers(){

  }

  modifyUser(user:User){

  }

  deleteUser(user:User){

  }

}
