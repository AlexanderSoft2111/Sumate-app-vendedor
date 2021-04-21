import { Subscription } from 'rxjs';
import { identificacionCliente } from './../../models/insterfaces';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identificaciones',
  templateUrl: './identificaciones.component.html',
  styleUrls: ['./identificaciones.component.scss'],
})
export class IdentificacionesComponent implements OnInit {

  tituloVisita = "Visitas";

  constructor() { }

  ngOnInit() {

  }


}
