import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  titulohome = "Bienvenidos";

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor( public basedeDatosService:BasedeDatosService,
               public route:Router,
               private navCtrl: NavController) { }


  ngOnInit() {
     
    
  }

  empezar(){
    this.navCtrl.navigateBack('/tienda')
  }

}
