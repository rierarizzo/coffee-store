import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { UsersService } from 'src/app/services/users/users.service';
import { UsersModifyComponent } from '../users-modify/users-modify.component';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatRow } from '@angular/material/table';
import { Rol } from 'src/app/entities/rol';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  datosOriginales!: any[];
  rol: string = "";
  selectedItem: any;
  rolControl = new FormControl<Rol | null>(null);
  roles: any;
  dataSource!: MatTableDataSource<any>
  suscription!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private router: Router, private usersService: UsersService, private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'idUser', 'name', 'lastname', 'email', 'rol', 'accion'];

  ngOnInit(): void {
    this.obtenerdatos();
    this.suscription = this.usersService.refresh$.subscribe(() => {
      this.obtenerdatos();
    }
    );
    this.usersService.GetRol().subscribe((data: any) => {
      this.roles = data;
    });    
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  obtenerdatos(): void {
    this.usersService.getDatos().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data as any[]);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.datosOriginales = this.dataSource.data;
    });
    this.usersService.GetRol().subscribe((data: any) => {
      this.roles = data;
    });
  }

  openUserModify(element: any) {
    let rol = this.obtenerCodigoRol(this.roles, element.Descripcion)
    this.dialog.open(UsersModifyComponent, {
      width: '50%',
      data: {
        user: element,
        cargo: rol
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

  onChangeObj(valueSelect: string) {
    if (valueSelect != undefined) {
      this.dataSource.data = this.datosOriginales.filter(dato =>
        dato.Descripcion.includes(valueSelect)
      );
    }else{
      this.obtenerdatos();
    }  
  }

  obtenerCodigoRol(arr:any[], rol: any): any {
    return Object.values(arr).find(obj => obj.Descripcion === rol).Codigo
  }
}
