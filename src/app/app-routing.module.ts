import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  /* Rutas usuario */
  {path: 'adm-usuarios', component: UsersListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
