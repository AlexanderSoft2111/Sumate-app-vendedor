import { Subscription } from 'rxjs';
import { CarritoService } from './../../servicios/carrito.service';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/insterfaces';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.scss'],
})
export class MisPedidosComponent implements OnInit, OnDestroy {

  nuevoSubscribir: Subscription;
  entregadoSubscribir: Subscription;
  pedidos: Pedido[] = [];
  pedidosEntregados: Pedido[] = [];
  starAt = null;
  private path = '/Pedidos';
  pedidoNuevo = true;
  loadNuevos = false;
  loadEntregados = false;
  opc= '';
  constructor( public basedeDatosService:BasedeDatosService,
               public carritoService:CarritoService,) { 
                
               }

  ngOnInit() {
    //this.getNuevos();
  }

  ionViewWillEnter(){
    //this.getNuevos();
    console.log("ingrese otra vez")
  }

  ngOnDestroy(){
    if(this.nuevoSubscribir){
      this.nuevoSubscribir.unsubscribe();
    }
    
    if(this.entregadoSubscribir){
      this.entregadoSubscribir.unsubscribe();
    }
  }

   changeSegment(ev: any){
    this.opc = ev.detail.value;
     console.log("changeEvent");
    if(this.opc === 'Pendientes'){
      this.vaciarPedido(); 
      this.pedidoNuevo = true;
      console.log(this.loadNuevos);
        if(!this.loadNuevos){
          this.getNuevos();
          console.log('getNuevos');
        }
    } else if(this.opc === 'Entregados'){
          this.vaciarPedidoEntregado();
              this.pedidoNuevo = false;
              if(!this.loadEntregados){
                this.getEntregados();
                
              }
            }
  }

  async getNuevos(){

      if(this.pedidos.length){
        this.starAt = this.pedidos[this.pedidos.length -1].fecha;
      }
      this.nuevoSubscribir = this.basedeDatosService.getCollectionQueryVendedor<Pedido>(this.path,'estado', this.starAt).subscribe(res => {
        if(res.length){
          console.log("usuarios",res);
          this.loadNuevos = true;
          res.forEach(pedido => {
            const existe = this.pedidos.find(pedidoExiste => {
              return pedidoExiste.id === pedido.id;
            });
            if(existe === undefined){
              this.pedidos.push(pedido);
            }
          });
          this.ordenarPedidos(this.pedidos);
         }
        });
          
  }

  

 async getEntregados(){

  if(this.pedidosEntregados.length){
    this.starAt = this.pedidosEntregados[this.pedidosEntregados.length -1].fecha;
  }
  this.entregadoSubscribir = this.basedeDatosService.getCollectionQueryVendedorEntre<Pedido>(this.path,'estado','==','Entregado', this.starAt).subscribe(res => {
    if(res.length){
      this.loadEntregados = true;
      res.forEach(pedido => {
        const existe = this.pedidosEntregados.find(pedidoExiste => {
          return pedidoExiste.id === pedido.id;
        });
        if(existe === undefined){
          this.pedidosEntregados.push(pedido);
        }
      });
          
      this.ordenarPedidos(this.pedidosEntregados);
     }
    });
   
  }

  cargarmas(){
    if(this.pedidoNuevo){
     this.getNuevos();
    } else {
      this.getEntregados();
    }
    
  }

  ordenarPedidos(pedidos: Pedido[]){

    pedidos.sort((a, b) => {
      if(a.fecha > b.fecha){
        return -1;
      } else if(a.fecha > b.fecha){
          return 1;
      }
      return 0;
    });
  
  }

  vaciarPedido(){
    if(this.pedidos.length){
  
      this.pedidos.splice(3, this.pedidos.length)
  
    }   
  } 

  vaciarPedidoEntregado(){
    if(this.pedidosEntregados.length){
  
      this.pedidosEntregados.splice(3, this.pedidosEntregados.length)
    }
  
  } 

}

       
