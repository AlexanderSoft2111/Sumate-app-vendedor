import { Usuario } from './models/insterfaces';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasedeDatosService } from './servicios/basede-datos.service';
import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SetDatosService } from './servicios/set-datos.service';

// import {Plugins, StatusBarStyle} from '@capacitor/core'

// const {SplashScreen, StatusBar} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  uid = '';
  usuario: Usuario = {
    id: '', 
    nombre: '',
    apellido: '',
    celular: '',
    email: '',
    rol: 'Vendedor',
    contrasena: '',
    cedula: '',
    FechaCreacion: new Date,
    estado: 'activo',
  }
  cliente = true;
  suscribirDoc: Subscription;
  vendedor = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu:MenuController,
    public Firebase:BasedeDatosService,
    public route:Router,
    public setDatosService:SetDatosService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // SplashScreen.hide();
      // StatusBar.setBackgroundColor({color: '#ffffff'});
      // StatusBar.setStyle({
      //   style: StatusBarStyle.Light
      // });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     this.Permisos();
    });
  }

  Permisos(){
   this.suscribirDoc = this.Firebase.getUidState().subscribe( res => {
      if(res !== null){
        console.log(res);
        this.uid = 'aYc9NfGPQhRtFvG9oCAe7RzDCj22';
        this.vendedor = true;
        const path = 'Usuarios';
       this.suscribirDoc = this.Firebase.getDoc<Usuario>(path, this.uid).subscribe(user =>{
          if(user !== null){
            this.usuario = user;
           this.suscribirDoc.unsubscribe();
          }
         });
      }
      else if(res===null){
       this.vendedor = false;
      } 
    });
    
  }

  Salir(){
    this.suscribirDoc.unsubscribe();
    this.Firebase.logout();
    this.route.navigate(['login']);
    this.cerrarMenu();
    this.vendedor = false;

  }

  cerrarMenu(){
    this.menu.close();
  }

}
