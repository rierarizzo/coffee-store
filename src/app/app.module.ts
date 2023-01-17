/* Componentes importados Angular */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
/* Componentes creados */
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { UsersModifyComponent } from './components/users/users-modify/users-modify.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { ProductsViewComponent } from './components/Inventary/products/products-view/products-view.component';
import { AddProductsComponent } from './components/Inventary/products/add-products/add-products.component';
import { ModifyProductsComponent } from './components/Inventary/products/modify-products/modify-products.component';
import { DeleteProductsComponent } from './components/Inventary/products/delete-products/delete-products.component';
import { CategoryListComponent } from './components/Inventary/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/Inventary/category/add-category/add-category.component';
import { ModifyCategoryComponent } from './components/Inventary/category/modify-category/modify-category.component';
import { DeleteCategoryComponent } from './components/Inventary/category/delete-category/delete-category.component';
import { UsersDeleteComponent } from './components/users/users-delete/users-delete.component';
import { UsersConfirmationComponent } from './components/users/users-confirmation/users-confirmation.component';
import { ClientsModifyComponent } from './components/clients/clients-modify/clients-modify.component';
import { ClientsConfirmationComponent } from './components/clients/clients-confirmation/clients-confirmation.component';
import { ClientsMessageComponent } from './components/clients/clients-message/clients-message.component';
import { ClientsOptionsComponent } from './components/clients/clients-options/clients-options.component';
import { ProductsDetailsComponent } from './components/Inventary/products/products-details/products-details.component';
import { ProductConfirmationComponent } from './components/Inventary/products/product-confirmation/product-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MainPageComponent,
    PurchaseComponent,
    HeaderComponent,
    FooterComponent,
    UsersModifyComponent,
    UsersListComponent,
    ProductsViewComponent,
    AddProductsComponent,
    ModifyProductsComponent,
    DeleteProductsComponent,
    CategoryListComponent,
    AddCategoryComponent,
    ModifyCategoryComponent,
    DeleteCategoryComponent,
    UsersDeleteComponent,
    UsersConfirmationComponent,
    ClientsModifyComponent,
    ClientsConfirmationComponent,
    ClientsMessageComponent,
    ClientsOptionsComponent,
    ProductsDetailsComponent,
    ProductConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
