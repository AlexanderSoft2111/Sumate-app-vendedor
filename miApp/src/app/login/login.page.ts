import { Router } from '@angular/router';
// import { UsuariosRegistro } from './../models/insterfaces';
import { BasedeDatosService } from './../servicios/basede-datos.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: '',
  };
  
  roles = '';
  uid = '';


  constructor(public Firebase: BasedeDatosService,
             public toastController: ToastController,
             public route: Router) { }

  ngOnInit() {

  }

  login(){
    this.Firebase.login(this.user.email, this.user.password).then(res => {
      this.presentToast("Login exitoso");
      this.vaciarCredenciales();
      this.route.navigate(['inicio']);
            }).catch(error => {
      this.presentToast("Error, usuario y contraseña invalidos");
            });
      
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


 vaciarCredenciales(){
  this. user = {
    email: '',
    password: '',
  };
 }

}

