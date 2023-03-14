import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/* Components */
import { MainPageComponent } from "src/app/components/main-page/main-page.component";
import { SignInComponent } from "src/app/components/sign-in/sign-in.component";
import { SignUpComponent } from "src/app/components/sign-up/sign-up.component";
import { ClientsModifyComponent } from "./components/clients/clients-modify/clients-modify.component";
import { ClientsOptionsComponent } from "./components/clients/clients-options/clients-options.component";
import { AddProductsComponent } from "./components/Inventary/products/add-products/add-products.component";
import { ModifyProductsComponent } from "./components/Inventary/products/modify-products/modify-products.component";
import { ProductsViewComponent } from "./components/Inventary/products/products-view/products-view.component";
import { UsersListComponent } from "./components/users/users-list/users-list.component";
import { AdmPanelComponent } from "./components/adm/adm-panel/adm-panel.component";
import { PayConfirmationComponent } from "./components/pagos/pay-confirmation/pay-confirmation.component";
import { ClientsViewComponent } from "./components/clients/clients-view/clients-view.component";

/* Guards */
import { AuthGuard } from "./guards/auth/auth.guard";
import { RoleGuard } from "./guards/role/role.guard";

const routes: Routes = [
	{ path: "", component: MainPageComponent },
	/* Authentication */
	{ path: "login", component: SignInComponent },
	{ path: "register", component: SignUpComponent },
	/* Rutas usuario ADM */
	{
		path: "adm-panel",
		component: AdmPanelComponent,
		canActivate: [AuthGuard, RoleGuard],
	},
	{
		path: "adm-users",
		component: UsersListComponent,
		canActivate: [AuthGuard, RoleGuard],
	},
	/* Rutas Producto */
	{
		path: "adm-productos/add",
		component: AddProductsComponent,
		canActivate: [AuthGuard, RoleGuard],
	},
	{
		path: "adm-productos/view",
		component: ProductsViewComponent,
		canActivate: [AuthGuard, RoleGuard],
	},
	{
		path: "adm-productos/modify",
		component: ModifyProductsComponent,
		canActivate: [AuthGuard, RoleGuard],
	},
	/* Rutas Cliente */
	{
		path: "view-user",
		component: ClientsViewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "account",
		component: ClientsOptionsComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "edit-user",
		component: ClientsModifyComponent,
		canActivate: [AuthGuard],
	},
	/* Rutas  Carrito */
	{
		path: "carshop",
		component: PayConfirmationComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
