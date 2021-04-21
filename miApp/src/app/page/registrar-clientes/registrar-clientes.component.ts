import { MapasComponent } from './../../componentes/mapas/mapas.component';
import { SetDatosService } from './../../servicios/set-datos.service';
import { Router } from '@angular/router';
import { Cliente} from './../../models/insterfaces';
import { ArchivosMultimediaService } from './../../servicios/archivos-multimedia.service';
import { ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-registrar-clientes',
  templateUrl: './registrar-clientes.component.html',
  styleUrls: ['./registrar-clientes.component.scss'],
})
export class RegistrarClientesComponent implements OnInit {

  tituloRegistro = 'Registrar Cliente';
  actualizar = false
  newCliente: Cliente = {
    id: '',
      codigo: '',
      cedula: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      latitud: null,
      longitud: null,
      telefono: '',
      FechaCreacion: new Date(),
      rol: 'Cliente',
      imagenBig: '',
      imagenSmall: '',
      tipoCliente: 'Mayorista',
      contrasena: '',
      emailRegistro: '',      
      estado: 'activo',  
  };
  private path ='Clientes/';
  loading: any;
  newImage = '';
  newFile = '';
  newThumbnail = '';
  registrando = false;
  uid = '';

  constructor(public basedeDatosService: BasedeDatosService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public fireStorage: ArchivosMultimediaService,
              public route: Router,
              public setDatosService: SetDatosService,
              public modalController: ModalController) { }

  ngOnInit() {
    
     this.newCliente = this.setDatosService.getCliente();
     if(this.newCliente !== undefined && this.newCliente.id !== ''){
     this.actualizar = true;
         }
   }



  async addCliente(){
    if(this.newCliente.nombre !== '' && this.newCliente.apellido !== '' && this.newCliente.email !== '' && this.newCliente.direccion !== '' && this.newCliente.telefono !== ''){
      this.registrando = true;
      // this.rol();
      this.newCliente.emailRegistro = this.newCliente.nombre.substring(0,1) + this.newCliente.apellido.substring(0,1) + this.newCliente.cedula +"@gmail.com";
      this.newCliente.contrasena =  this.newCliente.nombre.substring(0,1) + this.newCliente.apellido.substring(0,1) + this.newCliente.cedula;
      this.newCliente.codigo = this.newCliente.contrasena;
         this.basedeDatosService.createUser(this.newCliente.emailRegistro, this.newCliente.contrasena).then(async (res) => {
          this.presentLoading();
           console.log(res);
           const uid = await this.basedeDatosService.getUid();
           this.registrando = false;
           const path = 'Clientes';
           const name = this.newCliente.nombre;
           const resp = await this.fireStorage.uploadImage(this.newFile, path, name);
          this.newCliente.imagenBig = resp;
          this.newCliente.imagenSmall = this.newThumbnail;
          this.presentToast("Se guardo con éxito");
           this.newCliente.id = uid;
           this.basedeDatosService.createDocument(this.newCliente, path, this.newCliente.id).then(() => {
            this.limpiar();
            this.loading.dismiss();
            this.route.navigate(['clientes']); 
           });
         }).catch(error => {
          this.presentToast("Eror, no se pudo guardar"); 
           this.registrando = false;
         });
    } else{
      this.presentToast("Todos los campos deben estar llenados");
    }
       
   }


  async updateCliente(){
    // this.rol();
    this.presentLoading();
    const name = this.newCliente.nombre;
    const resp = await this.fireStorage.uploadImage(this.newFile, this.path, name);
    this.newCliente.imagenBig = resp;
    this.newCliente.imagenSmall = this.newThumbnail;
    this.basedeDatosService.updateDoc(this.newCliente, this.path,this.newCliente.id).then(res => {
      this.loading.dismiss();
      this.presentToast("Se actualizo con éxito");
      this.actualizar = false;
      this.limpiar();
      this.loading.dismiss();
      this.route.navigate(['clientes']); 
    }).catch(error => {
      this.presentToast("Eror, no se pudo guardar"); 
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'subtitulo',
      message: 'Guardando',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      //color: 'light',
    });
    toast.present();
  }

// Codigo para visualizar una imagen en la web
async newImagenUpload(event: any){
  if(event.target.files && event.target.files[0]){
       this.newFile = event.target.files[0];
       const reader = new FileReader();
       reader.onload = ((image) => {
        this.resizeImage(image.target.result, 300);
           this.newCliente.imagenBig = image.target.result as string;
         });
       reader.readAsDataURL(event.target.files[0]);
   }
}


resizeImage(imgIn: any, MAX_WIDTH: number) {

  const img = document.createElement('img');
  img.src = imgIn;

  setTimeout(() => {
    const MAX_HEIGHT = MAX_WIDTH;
    let width = img.width;
    let height = img.height;
    if (width >= height) {
      if (width >= MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      } else if (height >= MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    } else {
      if (height >= MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      } else if (width >= MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    }
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    this.newThumbnail = canvas.toDataURL('image/png');
  }, 200);

}

limpiar(){
  this.newCliente = {
    id: '',
    codigo: '',
    cedula: '',
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    latitud: null,
    longitud: null,
    telefono: '',
    FechaCreacion: new Date(),
    rol: 'Cliente',
    imagenBig: '',
    imagenSmall: '',
    tipoCliente: 'Mayorista',
    contrasena: '',
    emailRegistro: '',      
    estado: 'activo', 
  };
  this.setDatosService.limpiarCliente();

}

cancelar(){
  this.limpiar();
  this.route.navigate(['clientes']); 
}

rol(){
  if(this.newCliente.tipoCliente === "Mayorista"){
    this.newCliente.tipoCliente = 'Mayorista'

  } else{
    this.newCliente.tipoCliente = 'Minorista'

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


