import { TutorialesComponent } from './tutoriales/tutoriales.component';
import { CatalogoProductosComponent } from './catalogo-productos/catalogo-productos.component';
import { RegistroIdentificacionesComponent } from './registro-identificaciones/registro-identificaciones.component';
import { IdentificacionesComponent } from './identificaciones/identificaciones.component';
import { RegistrarClientesComponent } from './registrar-clientes/registrar-clientes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TiendaComponent } from './tienda/tienda.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductosComponent } from './productos/productos.component';
import { ComponentesModule } from './../componentes/componentes.module';
import { AppRoutingModule } from './../app-routing.module';
import { IonicModule } from '@ionic/angular';
// import { UsuariosComponent } from './usuarios/usuarios.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    HomeComponent,
    // UsuariosComponent,
    ProductosComponent,
    CarritoComponent,
    MisPedidosComponent,
    TiendaComponent,
    ClientesComponent,
    RegistrarClientesComponent,
    IdentificacionesComponent,
    RegistroIdentificacionesComponent,
    CatalogoProductosComponent,
    TutorialesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
    FormsModule,
    ComponentesModule,
    SwiperModule
  ],
  // exports: [UsuariosComponent]
})
export class PageModule { }
