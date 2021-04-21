import { Subscription } from 'rxjs';
import { BasedeDatosService } from 'src/app/servicios/basede-datos.service';
import { Producto } from 'src/app/models/insterfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-catalogo-productos',
  templateUrl: './catalogo-productos.component.html',
  styleUrls: ['./catalogo-productos.component.scss'],
})
export class CatalogoProductosComponent implements OnInit, OnDestroy {

  tituloProductos = "Productos";
  productos: Producto[] = [];
  private path = '/Productos'
  producSuscribir: Subscription;

  constructor( public basedeDatosService: BasedeDatosService) { }

  ngOnInit() {

      this.getProducto();

  }

  ngOnDestroy(): void {
    if(this.producSuscribir){
      this.producSuscribir.unsubscribe();
    }
    
  }

  getProducto(){
     this.producSuscribir = this.basedeDatosService.getCollectionChanges<Producto>(this.path).subscribe( res => {
        if(res.length){
          this.productos = res;
        }
      });
  }

}
