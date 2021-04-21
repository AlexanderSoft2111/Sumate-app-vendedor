import { MapasComponent } from './mapas/mapas.component';
import { FormIdentificacionesComponent } from './form-identificaciones/form-identificaciones.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { ItemCarritoComponent } from './item-carrito/item-carrito.component';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { HeaderComponent } from './header/header.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './../app-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelecionarClienteComponent } from './selecionar-cliente/selecionar-cliente.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    FooterComponent,
    FormularioComponent,
    HeaderComponent,
    CardProductoComponent,
    ItemCarritoComponent,
    FormClientesComponent,
    FormIdentificacionesComponent,
    MapasComponent,
    SelecionarClienteComponent
  ],

  entryComponents: [
    MapasComponent,
    SelecionarClienteComponent
  ],

  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
    FormsModule,  
    SwiperModule
    
  ],
  exports: [
    FooterComponent,
    FormularioComponent,
    HeaderComponent,
    CardProductoComponent,
    ItemCarritoComponent,
    FormClientesComponent,
    FormIdentificacionesComponent,
    MapasComponent,
    SelecionarClienteComponent
  ]
})
export class ComponentesModule { }
