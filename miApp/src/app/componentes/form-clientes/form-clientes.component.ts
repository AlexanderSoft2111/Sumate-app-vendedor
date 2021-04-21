import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { SetDatosService } from './../../servicios/set-datos.service';
import { ArchivosMultimediaService } from './../../servicios/archivos-multimedia.service';
import { ToastController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { Cliente } from './../../models/insterfaces';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss'],
})
export class FormClientesComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  loading: any;
  starAt = null;
  nuevoSubscribir: Subscription;
  private path ='Clientes/';
  ver = false;
  constructor(
              public basedeDatosService: BasedeDatosService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public fireStorage: ArchivosMultimediaService,
              public setDatosService: SetDatosService,
              public actionSheetController: ActionSheetController,
              public router: Router) { }

  ngOnInit() {
    this.getClientes();
  }

  ngOnDestroy(){
    if(this.nuevoSubscribir){
        this.nuevoSubscribir.unsubscribe();
    }

  }

  getClientes(){
    if(this.clientes.length){
      this.starAt = this.clientes[this.clientes.length -1].FechaCreacion;
      }
      const items = 5;
      this.nuevoSubscribir = this.basedeDatosService.getCollectionQuery<Cliente>(this.path, 'estado', '==', 'activo', this.starAt, items).subscribe(res => {
      if(res.length){
        console.log(res);
        res.forEach(cliente => {
          const existe = this.clientes.find(clienteExiste => {
            return clienteExiste.id === cliente.id;    
          });
            if(existe === undefined){
            this.clientes.push(cliente);

              }
          });
          this.ordenarClientes(this.clientes);
        }
      });
  }

  ordenarClientes(clientes: Cliente[]){

    clientes.sort((a, b) => {
      if(a.FechaCreacion > b.FechaCreacion){
        return -1;
      } else if(b.FechaCreacion > a.FechaCreacion){
          return 1;
      }
      return 0;
    });
  
  }
  
  vaciarClientes(){
    if(this.clientes.length){
      this.clientes.splice(5, this.clientes.length)
    }
  }

  //Para obtenere todos los clientes se ejecuta la siguiente sentencia
  // getClientes(){

  //   this.basedeDatosService.getCollectionChanges<Cliente>(this.path).subscribe(res => {
  //     if(res.length){
  //       this.clientes = res;
  //       }
  //     });
  // }
  
  

  async eliminarCliente(cliente:Cliente){
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
              this.basedeDatosService.updateDoc(cliente,this.path,cliente.id).then(res =>{
                this.presentToast("Se elímino con éxito"); 
                const clienteRemove = this.clientes.indexOf(this.clientes.find(element => {
                  return element.id === cliente.id;
                }));
                this.clientes.splice(clienteRemove, 1);
              }).catch(error => {
                this.presentToast("No se pudo eliminar"); 
              });
            }
          }
        ]
      });
  
      await alert.present();
    
    
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'subtitulo',
      message: 'Guardando',
      duration: 3000,
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

    editCliente(editCliente: Cliente){
    this.setDatosService.setCliente(editCliente);
  }

  enviarCodigo(getCliente: Cliente){
  const  countrycode = "593";
  const  numero = getCliente.telefono;
  const  url = "https://wa.me/"+countrycode+numero+"?text=Hola, tu código para iniciar sesión es: "+getCliente.codigo;
  return url;
  }

  cargarMas(){
    if(this.clientes){
      this.getClientes();  
    }
    
  }

  ocultar(){

    if(this.ver){
      this.ver = false;
    }
       else {
        this.ver = true;
        }
      }

      async presentActionSheet( cliente: Cliente) {
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
              this.editCliente(cliente);
              this.router.navigate(['set-clientes']);
            }
          }, {
            text: 'Enviar código',
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