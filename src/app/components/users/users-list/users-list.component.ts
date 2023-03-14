import { Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/entities/users';
import { UsersService } from 'src/app/services/users/users.service';
import { UsersModifyComponent } from '../users-modify/users-modify.component';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatRow } from '@angular/material/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  dataSource: User[] = [];
  rol: string = "";
  selectedItem: any;

  data!: MatTableDataSource<any>
  suscription!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private router:Router, private usersService: UsersService, private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id','idUser', 'name', 'lastname', 'email', 'rol', 'accion'];

  ngOnInit(): void {
    this.obtenerdatos(); 
    this.suscription = this.usersService.refresh$.subscribe(()=> 
      {
        this.obtenerdatos();
      }
    );
    this.usersService.GetRol().subscribe((data: any) => {
      this.rol = data;
    });
  }
  
  ngOnDestroy(): void{
    this.suscription.unsubscribe();
  }

  obtenerdatos(): void{
    this.usersService.getDatos().subscribe((data:any) => {
      console.log(this.usersService.getDatos())
      this.data = new MatTableDataSource<any>(data as any[]);
      this.data.paginator = this.paginator
      this.data.sort = this.sort;
    });
  }


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

  onChangeObj(valueSelect: string) {
    this.dataSource = this.usersService.filterUsersRol(valueSelect);
    console.log(this.dataSource);
  }

}
