import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  /* Authentication */
  { path: 'login', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
