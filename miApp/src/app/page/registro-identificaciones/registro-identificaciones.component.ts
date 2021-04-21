import { MapasComponent } from './../../componentes/mapas/mapas.component';
import { SetDatosService } from './../../servicios/set-datos.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { identificacionCliente} from './../../models/insterfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-identificaciones',
  templateUrl: './registro-identificaciones.component.html',
  styleUrls: ['./registro-identificaciones.component.scss'],
})
export class RegistroIdentificacionesComponent implements OnInit {

  tituloRegVisita = 'Registrar Visita';
  actualizar = false
  newCliente: identificacionCliente = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    latitud: null,
    longitud: null,
    telefono: '',
    FechaCreacion: new Date(),
    tipoVisita: 'Visitado',
    estado: 'activo',
  };
  private path ='Identificaciones/';
  loading: any;
  registrando = false;
  constructor(public basedeDatosService: BasedeDatosService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public route: Router,
              public setDatosService: SetDatosService,
              public modalController: ModalController) {
               }

  ngOnInit() {
    this.newCliente = this.setDatosService.getidentCliente();
    if(this.newCliente !== undefined && this.newCliente.id !== ''){
    this.actualizar = true;
        }
  }

  async addCliente(){
    this.registrando = true;
    this.rol();
    this.presentLoading();
    this.newCliente.id = this.basedeDatosService.createID();
    await this.basedeDatosService.createDocument(this.newCliente, this.path, this.newCliente.id).then( () => {
      this.presentToast("Se guardo con éxito");
      this.limpiar();
      this.route.navigate(['identificaciones']); 
      // this.modalController.dismiss();
    }).catch(error => {
      this.presentToast("Eror, no se pudo guardar"); 
       this.registrando = false;
     });   
     
 }


  async updateCliente(){
    this.rol();
    this.presentLoading();
    this.basedeDatosService.updateDoc(this.newCliente, this.path,this.newCliente.id).then(res => {
      this.loading.dismiss();
      this.presentToast("Se actualizo con éxito");
      this.actualizar = false;
      this.limpiar();
      this.route.navigate(['identificaciones']); 
    }).catch(error => {
      this.presentToast("Eror, no se pudo guardar"); 
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'subtitulo',
      message: 'Guardando',
      duration: 2000,
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'light',
    });
    toast.present();
  }


limpiar(){
  this.newCliente = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    latitud: null,
    longitud: null,
    telefono: '',
    FechaCreacion: new Date(),
    tipoVisita: 'Visitado',
    estado: 'activo',
  };
  this.setDatosService.limpiarIdentCliente();
}

cancelar(){
  this.limpiar();
  this.route.navigate(['identificaciones']); 
}

rol(){
  if(this.newCliente.tipoVisita === "Visitado"){
    this.newCliente.tipoVisita = "Visitado";

  } else{
    this.newCliente.tipoVisita = "Volver a visitar";

  }
}

async addDirection(){
  
  //le asignamos unas coordenas a la ubicacion para decirle que si es nula asigne por defecto
  const ubicacion = this.newCliente.direccion;
  const lat = this.newCliente.latitud;
  const lng = this.newCliente.longitud;

  let positionInput = {
    lat: -2.898116,
    lng: -78.99958149999,
    direccion: ''
  };

  if(ubicacion !== null){
      positionInput.direccion = ubicacion;
      positionInput.lat = lat;
      positionInput.lng = lng;
  }   
  }

async openModal(){
  const modal = await this.modalController.create({
    component: MapasComponent,
  });

  await modal.present();
  const {data}= await modal.onWillDismiss();
  console.log(data)
    this.newCliente.latitud = data.latitud;
    this.newCliente.longitud = data.longitud;
    this.newCliente.direccion = data.direccion;
    console.log("la direccion es: ",this.newCliente.longitud);
 }



}
