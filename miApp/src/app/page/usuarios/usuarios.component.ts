// import { UsuariosRegistro } from './../../models/insterfaces';
// import { LoadingController, ToastController } from '@ionic/angular';
// import { BasedeDatosService } from '../../servicios/basede-datos.service';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-usuarios',
//   templateUrl: './usuarios.component.html',
//   styleUrls: ['./usuarios.component.scss'],
// })
// export class UsuariosComponent implements OnInit {

//   listaUsuarios: UsuariosRegistro [] = [];
//   eliminando: any;
//   constructor(public basedeDatosService: BasedeDatosService,
//               public toastController: ToastController,
//               public loadingController: LoadingController) { }
  
//   ngOnInit() {
//     this.getListUser();
//   }

//   getListUser(){
//     const enlace = 'Usuarios';
//     this.basedeDatosService.getCollectionChanges<UsuariosRegistro>(enlace).subscribe( res => { 
//       this.listaUsuarios = res;
//     }); 
//   }

//   setListUser(){
//     const enlace = 'Usuarios';
//     this.basedeDatosService.getCollectionChanges<UsuariosRegistro>(enlace).subscribe( res => { 
//       this.listaUsuarios = res;
//     }); 
//   }

//   editUser(user: UsuariosRegistro){
//     const userEdit = this.basedeDatosService.setUser(user);
//   }

//   async deleteUser(user: UsuariosRegistro){
//     console.log("este es el ",user)
//     this.presentLoading();
//    await this.basedeDatosService.deleteDocument<UsuariosRegistro>('Usuarios',user.id)
//    this.eliminando.dismiss();
//    this.presentToast("Usuario eliminado con exito", 2000);
    
//   }

//   async presentToast(mensaje: string, tiempo: number) {
//     const toast = await this.toastController.create({
//       message: mensaje,
//       duration: tiempo
//     });
//     toast.present();
//   }

//   async presentLoading() {
//     this.eliminando = await this.loadingController.create({
//       message: 'Eliminando...'
//     });
//     await this.eliminando.present();

//   } 
// }
