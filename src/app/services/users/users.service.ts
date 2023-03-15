import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  public shoppingCartKey: string = "shoppingCart";
  baseUrl: string = environment.endpoint + 'api/Usuario/';
  base: string = environment.endpoint + 'api/Rolusuario/';
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }
  get refresh$() {
    return this._refresh$;
  }

  dummyData: User[] = [
    /* {
       id: 1,
       idUser: '000000000',
       name: 'Keneth Danilo',
       lastname: 'Mero Minchala',
       email: 'admin@gmail.com',
       password: 'admin123',
       rol: 'ADMIN'
     },
     {
       id: 2,
       idUser: '0151245245',
       name: 'Andrés Luis',
       lastname: 'Carvajal Lozano',
       email: 'andresito@gmail.com',
       password: 'pepitotrulo',
       rol: 'USER'
     },
     {
       id: 3,
       idUser: '0954658913',
       name: 'Jorge Luis',
       lastname: 'Charco Aguirre',
       email: 'jorgito@gmail.com',
       password: 'pepitotrulo',
       rol: 'USER'
     },
     {
       id: 4,
       idUser: '0957962158',
       name: 'Andrea Lisbeth',
       lastname: 'Romero Haro',
       email: 'andrea@gmail.com',
       password: 'pepitotrulo',
       rol: 'USER'
     }*/
  ]
  //comentario de prueba

  getDatos() {
    return this.http.get(this.baseUrl);
  }

  getDatosId(id:any) {
    return this.http.get(this.baseUrl+'getuser?id='+id);
  }

  GetRol() {
    return this.http.get(this.base);
  }

  isAdmin(user: User): boolean {
    return user.rol.charAt(0) === 'A';
  }

  createUser(user: User): User {
    let userToReturn: User = this.generateIdUser(user)!;

    this.dummyData.push(userToReturn);

    return userToReturn;
  }

  getUsers(): User[] {
    return this.dummyData;
  }

  getUser(user: User): User | null {
    this.dummyData.find((obj) => {
      return obj.email === user.email && obj.password === user.password ? obj : undefined
    });
    /* return this.dummyData[this.dummyData.indexOf(user)]; */
    return user;
  }

  generateIdUser(user: User): User {
    if (this.dummyData.indexOf(user) === -1) {
      user.id = 1;
      return user;
    } else {
      user.id = this.dummyData.indexOf(this.dummyData[this.dummyData.length - 1]) + 1
      return user;
    }
  }

  /* modifyUser(userNew: User, userOld: User) {
    this.dummyData[this.dummyData.indexOf(userOld)] = userNew;
  } */

  modifyUser(user: User) {
    return this.http.put(`${this.baseUrl}updatedata/`, user)
  }

  deleteUser(id:any) {
    /*this.dummyData.splice(this.dummyData.indexOf(user), 1)*/
    return this.http.delete(`${this.baseUrl}deleteuser/${id}`, id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.dummyData.find((user) => {
      return user.email === email;
    })
  }

  getUserById(id: number): User | undefined {
    return this.dummyData.find((user) => {
      return user.id === id;
    })
  }

  filterUsersRol(value: string): User[] {
    return this.dummyData.filter((obj) => {
      if (value === 'All') {
        return this.dummyData
      } else {
        return obj.rol === value
      }
    });
  }

}
