import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudClienteComponent } from './modulo/crud-cliente/crud-cliente.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';

import { CrudProductoComponent } from './modulo/crud-producto/crud-producto.component';
import { CrudComprasComponent } from './modulo/crud-compras/crud-compras.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ListmovieComponent } from './modulo/listepisodios/listmovie.component';
import { ViewmovieComponent } from './modulo/viewmovie/viewmovie.component';
import { FiltrarJsonPipe } from './pipes/filtrar-json.pipe';

import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    CrudClienteComponent,
    NotfoundComponent,
    CrudProductoComponent,
    CrudComprasComponent,
    LoginComponent,
    NavbarComponent,
    ListmovieComponent,
    ViewmovieComponent,
    FiltrarJsonPipe
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
