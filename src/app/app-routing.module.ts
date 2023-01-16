import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { AddProductsComponent } from './components/Inventary/products/add-products/add-products.component';
import { ProductsViewComponent } from './components/Inventary/products/products-view/products-view.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  /* Authentication */
  { path: 'login', component: SignInComponent },
  /* Rutas usuario */
  {path: 'adm-users', component: UsersListComponent},
  /* Rutas Producto */
  {path: 'adm-productos/agregar', component: AddProductsComponent},
  {path: 'adm-productos/view', component: ProductsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
