import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/entities/products';
import { User } from 'src/app/entities/users';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.css']
})
export class PurchaseConfirmationComponent {

  displayedColumns: string[] = ['name', 'description', 'price'];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialogRef: MatDialogRef<PurchaseConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTotalAmount(): number {
    let total: number = 0;

    for (let e of this.dataSource) {
      total += e.price;
    }

    return total;
  }
}

export interface DialogData {
  client: User;
  products: Product[];
}

export interface PeriodicElement {
  name: string;
  description: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Café colombiano', price: 5.56, description: 'Café 100% colombiano' },
  { name: 'Dulce de 3 leches', price: 4.50, description: 'Delicioso dulce de 3 leches' },
  { name: 'Frappé', price: 2.30, description: 'Le metió 4 al dibu' }
];