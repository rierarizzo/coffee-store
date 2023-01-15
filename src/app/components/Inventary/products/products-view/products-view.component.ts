import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatRow} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/entities/products';
import { AddProductsComponent } from '../add-products/add-products.component';
import { DeleteProductsComponent } from '../delete-products/delete-products.component';
import { ModifyProductsComponent } from '../modify-products/modify-products.component';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  //Datos
  ListProduct: Product [] = []
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Precio', 'Categoria', 'Estado','Descripcion','Botones'];
  dataSource = new MatTableDataSource <any>;
  
  
constructor(public dialog:MatDialog, private listService:ProductsService ){ };

  ngOnInit(): void {
  this.ListProduct = this.listService.getDatos();
  this.dataSource = new MatTableDataSource(this.ListProduct);
}

}
