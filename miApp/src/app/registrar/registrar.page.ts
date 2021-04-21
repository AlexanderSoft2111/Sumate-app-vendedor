// import { UsuariosRegistro} from './../models/insterfaces';
// import { ToastController } from '@ionic/angular';
// import { BasedeDatosService } from './../servicios/basede-datos.service';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

 @Component({
   selector: 'app-registrar',
   templateUrl: './registrar.page.html',
   styleUrls: ['./registrar.page.scss'],
 })
 export class RegistrarPage implements OnInit {
//   userEdit: UsuariosRegistro;
//   user: UsuariosRegistro = {
//     id: "",
//     nombre: "",
//     apellido: "",
//     direccion: null,
//     email: "",
//     FechaCreacion: new Date,
//     cedula: "",
//     contrasena: "",
//     telefono: "",
//     tipoUsuario: "admin",
//   }
//     confcontrasena: "";
//     registrando = false;
//     uid = '';
//     roles = '';

//   constructor(public firebase: BasedeDatosService,
//               public toastController: ToastController,
//               public route: Router) { }

//    ngOnInit() {
//     this.userEdit = this.firebase.getUser();
//     console.log("El usuario a editar es ",this.userEdit);
//     if(this.userEdit !== undefined){
//       this.user = this.userEdit;
//     }
//   }

ngOnInit() {
  
}

//   addUser(){
//    this.registrando = true;
//    this.user.email = this.user.nombre.substring(0,1) + this.user.apellido.substring(0,1) + this.user.cedula +"@gmail.com";
//    this.user.contrasena =  this.user.nombre.substring(0,1) + this.user.apellido.substring(0,1) + this.user.cedula;
//     if(this.user.contrasena === this.confcontrasena){
//       this.firebase.createUser(this.user.email, this.user.contrasena).then(async (res) => {
//         console.log(res);
//         const uid = await this.firebase.getUid();
//         this.registrando = false;
//         const path = 'Usuarios';
//         this.user.id = uid;
//         this.firebase.createDocument(this.user, path, this.user.id);
//         this.presentToast("Registro existoso");
//         this.firebase.getUidState().subscribe( res => {
//           if(res !== null){
//             this.uid = res.uid;
//           const path = 'Usuarios';
//           this.firebase.getDoc<UsuariosRegistro>(path, this.uid).subscribe(user =>{
//             this.roles = user.tipoUsuario;
//             if ((this.roles === "cliente") || (this.roles === "admin")) {
//                this.route.navigate(['login']);
//              }
//           });
//           }
          
//         });


//       }).catch(error => {
//         console.log("el error es = ",error);
//         this.registrando = false;
//       });
//     } else{
//       this.presentToast("Las contraseñas no coinciden, vuelva a registrarlas");
//       this.registrando = false;
//     }
    
//   }
//   async presentToast(mensaje: string) {
//     const toast = await this.toastController.create({
//       message: mensaje,
//       duration: 3000
//     });
//     toast.present();
//   }
}
