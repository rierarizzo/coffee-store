import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { AddProductsComponent } from './components/Inventary/products/add-products/add-products.component';
import { ModifyProductsComponent } from './components/Inventary/products/modify-products/modify-products.component';
import { ProductsViewComponent } from './components/Inventary/products/products-view/products-view.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { ProductsDetailsComponent } from './components/Inventary/products/products-details/products-details.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  /* Authentication */
  { path: 'login', component: SignInComponent },
  /* Rutas usuario */
  {path: 'adm-users', component: UsersListComponent},
  /* Rutas Producto */
  {path: 'adm-productos/add', component: AddProductsComponent},
  {path: 'adm-productos/view', component: ProductsViewComponent},
  {path: 'adm-productos/modify', component:ModifyProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
