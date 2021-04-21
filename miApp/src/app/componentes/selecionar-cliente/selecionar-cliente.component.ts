import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/insterfaces';
import { BasedeDatosService } from 'src/app/servicios/basede-datos.service';
import { SetDatosService } from 'src/app/servicios/set-datos.service';

@Component({
  selector: 'app-selecionar-cliente',
  templateUrl: './selecionar-cliente.component.html',
  styleUrls: ['./selecionar-cliente.component.scss'],
})
export class SelecionarClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  loading: any;
  starAt = null;
  nuevoSubscribir: Subscription;
  private path ='Clientes/';
  
  constructor( public basedeDatosService: BasedeDatosService,
               public setDatosService: SetDatosService,
               public route: Router,
               public modalController: ModalController) { }
  

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    if(this.clientes.length){
      this.starAt = this.clientes[this.clientes.length -1].FechaCreacion;
      }
      const items = 5;
      this.nuevoSubscribir = this.basedeDatosService.getCollectionQuery<Cliente>(this.path, 'estado', '==', 'activo', this.starAt, items).subscribe(res => {
      if(res.length){
        res.forEach(cliente => {
          const existe = this.clientes.find(clienteExiste => {
            return clienteExiste.id === cliente.id;    
          });
            if(existe === undefined){
            this.clientes.push(cliente);
              }
          });
        }
      });
  }

  selectCliente(editCliente: Cliente){
    this.modalController.dismiss({
      cliente: editCliente,
    });
    this.vaciarClientes();
  }

  cargarMas(){
    if(this.clientes){
      this.getClientes();  
    }
    
  }

  vaciarClientes(){
    if(this.clientes.length){
      this.clientes.splice(5, this.clientes.length)
    }
  }

  salir(){
    this.modalController.dismiss();
  }

}
