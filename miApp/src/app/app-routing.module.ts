import { TutorialesComponent } from './page/tutoriales/tutoriales.component';
import { CatalogoProductosComponent } from './page/catalogo-productos/catalogo-productos.component';
import { RegistroIdentificacionesComponent } from './page/registro-identificaciones/registro-identificaciones.component';
import { IdentificacionesComponent } from './page/identificaciones/identificaciones.component';
import { RegistrarClientesComponent } from './page/registrar-clientes/registrar-clientes.component';
import { ClientesComponent } from './page/clientes/clientes.component';
import { Rol } from './models/insterfaces';
import { MisPedidosComponent } from './page/mis-pedidos/mis-pedidos.component';
import { TiendaComponent } from './page/tienda/tienda.component';
import { CarritoComponent } from './page/carrito/carrito.component';
import { ProductosComponent } from './page/productos/productos.component';
// import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate} from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { SelecionarClienteComponent } from './componentes/selecionar-cliente/selecionar-cliente.component';

const isAdmin = (next: any) => map((user: any) => !!user && 'CZZh8afFi6PrutElrCaygCpIvp12' === user.uid); 

const routes: Routes = [
  {path:"inicio", component: HomeComponent},

  {path:"productos", component: ProductosComponent},
 
  // {path:"usuarios", component: UsuariosComponent, ...canActivate(isAdmin)},

  {path:"tienda", component: TiendaComponent},

  {path:"carrito", component: CarritoComponent},

  {path:"pedidos", component: MisPedidosComponent},

  {path:"clientes", component: ClientesComponent},

  {path:"set-clientes", component: RegistrarClientesComponent},

  {path: "identificaciones", component: IdentificacionesComponent},

  {path: "registrar-identificaciones", component: RegistroIdentificacionesComponent},

  {path: "catalogo-productos", component:  CatalogoProductosComponent},
  
  {path: "tutoriales", component: TutorialesComponent},

  {path: "select-clientes", component: SelecionarClienteComponent},

  {path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
 
  {path: 'registrar',loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)},
 
  {path: '**', redirectTo: 'login', pathMatch:'full'},
  
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
