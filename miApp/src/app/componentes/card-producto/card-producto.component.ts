import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarritoService } from './../../servicios/carrito.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cliente, Producto } from 'src/app/models/insterfaces';
import { SetDatosService } from 'src/app/servicios/set-datos.service';
import { getLocaleEraNames } from '@angular/common';


@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.scss'],
  

})
export class CardProductoComponent implements OnInit {
  @Input() producto: Producto;
  @Output() enviar: EventEmitter<number> = new EventEmitter<number>();
  cantidad = 0;
  subtotal = 0;
  cliente: Cliente;
  id: '';
  items: 0;
  constructor(public carritoService: CarritoService,
              public setDatosService: SetDatosService,
              public router: Router,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  onSwiper(swiper) {
    console.log(swiper)
  }
  onSlideChange() {
    console.log('slide change')
  }


  addPedido(){
    this.carritoService.addProducto(this.producto, this.cantidad, this.subtotal);
    const pedidolocal = JSON.parse(localStorage.getItem('pedido'));
    if(pedidolocal !== null){
      this.items = pedidolocal.productos.length;
      this.enviar.emit(this.items);
    }
    

  }

  subirCantidad(){
    if(this.cantidad < this.producto.cantidadDisponible){
      this.cantidad = this.cantidad + this.producto.cpVenta; 
      this.subtotal = this.cantidad * this.producto.precio;
    } else{
      this.presentAlertPrompt('La cantidad pedida sobrepasa a la disponible !!');
    }
    this.subtotal.toFixed(2);
  }

  restarCantidad(){

    if(this.cantidad > 0){
      this.cantidad = this.cantidad - this.producto.cpVenta;
    } else{
      this.presentAlertPrompt('La cantida es 0, no se puede restar la cantidad !!');
      console.log();
    }
    this.subtotal = this.cantidad * this.producto.precio;
    this.subtotal.toFixed(2);
    
  }

  goCar(){
    this.cantidad = 0;
    this.subtotal = 0;
    this.router.navigate(['carrito']);
  }

  async presentAlertPrompt(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: message,
      buttons: [
       
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
  
    await alert.present();
  }

   
}


