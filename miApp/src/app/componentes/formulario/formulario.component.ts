import { ArchivosMultimediaService } from './../../servicios/archivos-multimedia.service';
import { Producto } from './../../models/insterfaces';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
    productos: Producto[] = [];
    newPro: Producto;
    enableNewProduct = false;
    private path ='Productos/';
    loading: any;
    newImage = '';
    newFile = '';
    newThumbnail = '';

  constructor(public basedeDatosService: BasedeDatosService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public fireStorage: ArchivosMultimediaService) { }

  ngOnInit() {
    this.getProducts();
  }
  async addProduct(){
    this.presentLoading();
    const path = 'Productos';
    const name = this.newPro.descripcion;
    const res = await this.fireStorage.uploadImage(this.newFile, path, name);
    this.newPro.imagen = res;
    this.newPro.imagenSmall = this.newThumbnail;
    this.basedeDatosService.createDocument(this.newPro, this.path,this.newPro.id).then(res => {
      this.loading.dismiss();
      this.presentToast("Se guardo con éxito");  
    }).catch(error => {
      this.presentToast("Eror, no se pudo guardar"); 
    });
  }

  getProducts(){
    this.basedeDatosService.getCollectionChanges<Producto>(this.path).subscribe(res => {
      this.productos = res;
    });
  }

  async deleteProdcut(producto:Producto){
      const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Alerta!',
        message: 'Desea <strong>eliminar</strong> este producto!!!',
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
              this.basedeDatosService.deleteDocument(this.path,producto.id).then(res =>{
                this.presentToast("Se elímino con éxito"); 
              }).catch(error => {
                this.presentToast("No se pudo eliminar"); 
              });
            }
          }
        ]
      });
  
      await alert.present();
    
    
  }
  new(){
    this.enableNewProduct = true;
    this.newPro = {
      id: this.basedeDatosService.createID(),
      codigo: '',
      descripcion: '',
      cantidadDisponible: null,
      FechaCreacion: new Date,
      precio: null,
      imagen: '',
      imagenSmall: '',
      calificacion: null,
      detalle: '',
      cpVenta: 0,
    }
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
      color: 'light',
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
                this.newPro.imagen = image.target.result as string;
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

}



