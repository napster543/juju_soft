import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { ListmovieComponent } from './modulo/listepisodios/listmovie.component';
import { ViewmovieComponent } from './modulo/viewmovie/viewmovie.component';

const routes: Routes = [];

const pagesRoutes: Routes = [     
  {path: 'listar_peliculas',  component: ListmovieComponent},  
  // {path: 'cliente',  component: CrudClienteComponent,canActivate:[AuthGuard]},  
  {path: 'listar_character',  component: ListmovieComponent},  
  {path: 'ver_peliculas/:name/:status',  component: ViewmovieComponent},  

  
  {path: '', redirectTo: '/listar_peliculas', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
