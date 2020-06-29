import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PublicComponent } from './components/public/public.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'public', component:PublicComponent},
  {path: 'home', component:HomeComponent},
  {path: 'user', component:UserComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
