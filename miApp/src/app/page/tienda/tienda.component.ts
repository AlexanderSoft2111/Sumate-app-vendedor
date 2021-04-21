import { Subscription } from 'rxjs';
import { BasedeDatosService } from './../../servicios/basede-datos.service';
import { Producto } from 'src/app/models/insterfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SetDatosService } from 'src/app/servicios/set-datos.service';
import SwiperCore, { EffectFade, Swiper, EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from "swiper/core";

// install Swiper components

//SwiperCore.use([EffectCoverflow]);

//SwiperCore.use([Navigation]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})


export class TiendaComponent implements OnInit, OnDestroy {
  
  tituloTienda = "Tienda";
  private path ='Productos/';
  productos: Producto [] = [];
  subscribir: Subscription;
  items: number;
  loading = true;
  //  swiper = new Swiper('.swiper-container', {
  //   effect: 'coverflow',
  //   grabCursor: true,
  //   centeredSlides: true,
  //   slidesPerView: 'auto',
  //   coverflowEffect: {
  //     rotate: 50,
  //     stretch: 0,
  //     depth: 100,
  //     modifier: 1,
  //     slideShadows: true,
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },
  //   });

    // swiper = new Swiper('.swiper-container', {
    //   slidesPerView: 4,
    //   centeredSlides: true,
    //   spaceBetween: 30,
    //   grabCursor: true,
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    // });
  
    swiper = new Swiper('.swiper-container', {
      cssMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination'
      },
      mousewheel: true,
      keyboard: true,
    });


  constructor(public basedeDatosService: BasedeDatosService,
              public setDatosService: SetDatosService) { 
   this.getProducts();
    }

  ngOnInit() {

  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  ionViewWillEnter(){
    const pedidolocal = JSON.parse(localStorage.getItem('pedido'));
    if(pedidolocal !== null){
      this.items = pedidolocal.productos.length;
    } else {
      this.items = 0;
    }
  }

  ngOnDestroy(){
    if(this.subscribir){
        this.subscribir.unsubscribe();
    }
  }

  getProducts(){
     this.subscribir = this.basedeDatosService.getCollectionChanges<Producto>(this.path).subscribe(res => {
      this.productos = res;
      if(!this.productos){
        console.log("no hay productos");
      } else{
        this.loading = false;
      }
    });
  }

  recibirItem(item: number){
    this.items = item;
  }

}
