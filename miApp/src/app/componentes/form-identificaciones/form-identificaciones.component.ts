import { RegistroIdentificacionesComponent } from './../../page/registro-identificaciones/registro-identificaciones.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SetDatosService } from './../../servicios/set-datos.service';
import { ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { identificacionCliente } from './../../models/insterfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-form-identificaciones',
  templateUrl: './form-identificaciones.component.html',
  styleUrls: ['./form-identificaciones.component.scss'],
})
export class FormIdentificacionesComponent implements OnInit, OnDestroy {
  clientesVolverVisita: identificacionCliente[] = [];
  clientesVisitados: identificacionCliente[] = [];
  loading: any;
  private path ='Identificaciones/';
  visitadoSubscribir: Subscription;
  volverVisitaSubscribir: Subscription;
  starAt = null;
  visitadoafteSuscribir: Subscription;
  clienteNuevo = true;
  loadVisitado = false;
  loadVolverVisita = false;
  opc = '';

  constructor(
              public basedeDatosService: BasedeDatosService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public setDatosService: SetDatosService,
              public actionSheetController: ActionSheetController,
              public router: Router,
              public modalController: ModalController) { 
                
              }

  ngOnInit() {

    this.getVisitado();  
    this.getVisitadosAfter();
  }

  ionViewWillEnter(){
    //this.getNuevos();
    console.log("entre otra vez");
 }

//  async presentModal() {
//   const modal = await this.modalController.create({
//     component: RegistroIdentificacionesComponent,
//     cssClass: 'my-custom-class'
//   });
//   return await modal.present();
// }

  ngOnDestroy(){
          if(this.visitadoSubscribir){
              this.visitadoSubscribir.unsubscribe();
          }

        if(this.volverVisitaSubscribir){
          this.volverVisitaSubscribir.unsubscribe();
          }

          if(this.visitadoafteSuscribir){
            this.visitadoafteSuscribir.unsubscribe();
            }
  }

changeSegment(ev: any){
    this.opc = ev.detail.value;
    if(this.opc === 'Visitado'){
        this.clienteNuevo = true;
            if(!this.loadVisitado){
              this.getVisitado();
              console.log("getVisitado");
            }
    } else if(this.opc === 'Volver a visitar'){
              this.clienteNuevo = false;
              console.log("loadVolverVisita", this.loadVolverVisita);
              if(!this.loadVolverVisita){
                this.getVolverVisita();
                console.log("getvolver a visitar");
              }
            }
  }


  async getVisitado(){
    if(this.clientesVisitados.length){
      this.starAt = this.clientesVisitados[this.clientesVisitados.length -1].FechaCreacion;
    }
    // this.visitadoSubscribir = 
    const items = 5;
    this.basedeDatosService.getCollectionQuery<identificacionCliente>(this.path,'tipoVisita','==','Visitado', this.starAt, items).subscribe(res => {
      if(res.length){
        this.loadVisitado = true;
        console.log(res);
        res.forEach(cliente => {
          const existe = this.clientesVisitados.find(clienteExiste => {
            return clienteExiste.id === cliente.id;
          });
          if(existe === undefined){
            this.clientesVisitados.push(cliente);
          }
        });
        this.ordenarClientes(this.clientesVisitados);
      }   
    });
    
  }

  getVisitadosAfter(){
      
      const starAt = new Date();
      starAt.setDate(starAt.getDate() + 1);
      console.log("fecha",starAt);
      const items = 1;
      this.visitadoafteSuscribir = this.basedeDatosService.getCollectionQuery<identificacionCliente>(this.path,'tipoVisita','==','Visitado', starAt, items).subscribe(res => {
        console.log("visitado After",res);
        if(res.length){
        this.loadVisitado = true;
        res.forEach(cliente => {
          const existe = this.clientesVisitados.find(clienteExiste => {
            return clienteExiste.id === cliente.id;
          });
          if(existe === undefined){
            this.clientesVisitados.push(cliente);
          }
        });
        this.ordenarClientes(this.clientesVisitados);
      }   
    });

  }
  
 async getVolverVisita(){
    if(this.clientesVolverVisita.length){
      this.starAt = this.clientesVolverVisita[this.clientesVolverVisita.length -1].FechaCreacion;
    }
    const items = 5;
    this.volverVisitaSubscribir = this.basedeDatosService.getCollectionQuery<identificacionCliente>(this.path,'tipoVisita','==','Volver a visitar', this.starAt, items).subscribe(res => {
      if(res.length){
        this.loadVolverVisita = true;
        res.forEach(cliente => {
          const existe = this.clientesVolverVisita.find(clienteExiste => {
            return clienteExiste.id === cliente.id;
          });
          
          if(existe === undefined){
            this.clientesVolverVisita.push(cliente);
          }
        });
        this.ordenarClientes(this.clientesVolverVisita);
      }
      
    });
  }

 cargarmas(){
   if(this.clienteNuevo){
    
    this.getVisitado();
    this.loadVolverVisita = false;
    this.loadVisitado = true;
   } else {
     this.getVolverVisita();
    this.loadVisitado = true;
    this.loadVolverVisita = true;
   }
   
 }

  async eliminarCliente(cliente:identificacionCliente){
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Alerta!',
      message: 'Desea <strong>eliminar</strong> este cliente!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
            cliente.estado = 'inactivo';
            cliente.tipoVisita = 'inactivo';
            this.basedeDatosService.updateDoc(cliente,this.path,cliente.id).then(res =>{
              this.presentToast("Se elímino con éxito"); 
              if(this.clienteNuevo){               
                const clienteRemove = this.clientesVisitados.indexOf(this.clientesVisitados.find(element => {
                  return element.id === cliente.id;
                }));
                this.clientesVisitados.splice(clienteRemove, 1);
              } else{
                const clienteRemove = this.clientesVolverVisita.indexOf(this.clientesVolverVisita.find(element => {
                  return element.id === cliente.id;
                }));
                this.clientesVolverVisita.splice(clienteRemove, 1);
              }
            }).catch(error => {
              this.presentToast("No se pudo eliminar"); 
            });
          }
        }
      ]
    });

    await alert.present();
  
}

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }


    editarCliente(editCliente: identificacionCliente){
    this.setDatosService.setIdentCliente(editCliente);
  }


 enviarCodigo(getCliente: identificacionCliente){
  const  countrycode = "593";
  const  numero = getCliente.telefono;
  const  url = "https://wa.me/"+countrycode+numero+"?text=Hola, accede al siguiente enlace para ver nuestro portafolio de productos: http://localhost:8100/catalogo-productos";
  return url;
  }

  ordenarClientes(clientes: identificacionCliente[]){

    clientes.sort((a, b) => {
      if(a.FechaCreacion > b.FechaCreacion){
        return -1;
      } else if(b.FechaCreacion > a.FechaCreacion){
          return 1;
      }
      return 0;
    });
  
  }

  async presentActionSheet( cliente: identificacionCliente) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      cssClass: 'my-custom-class',
      keyboardClose: false,
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'rojo' ,
        handler: () => {
          this.eliminarCliente(cliente);
        }
      }, 
        {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.editarCliente(cliente);
          this.router.navigate(['registrar-identificaciones']);
        }
      }, {
        text: 'Enviar catálogo',
        icon: 'logo-whatsapp',
        cssClass: 'whatsapp' ,
        handler: () => {
          console.log('Play clicked');
          window.location.href=this.enviarCodigo(cliente);
          
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

 
}
