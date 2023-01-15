import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductsViewComponent } from './components/inventary/products/products-view/products-view.component';
import { ModifyProductsComponent } from './components/inventary/products/modify-products/modify-products.component';
import { DeleteProductsComponent } from './components/inventary/products/delete-products/delete-products.component';
import { CategoryListComponent } from './components/inventary/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/inventary/category/add-category/add-category.component';
import { ModifyCategoryComponent } from './components/inventary/category/modify-category/modify-category.component';
import { DeleteCategoryComponent } from './components/inventary/category/delete-category/delete-category.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MainPageComponent,
    PurchaseComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    AddProductsComponent,
    ProductsViewComponent,
    ModifyProductsComponent,
    DeleteProductsComponent,
    CategoryListComponent,
    AddCategoryComponent,
    ModifyCategoryComponent,
    DeleteCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
