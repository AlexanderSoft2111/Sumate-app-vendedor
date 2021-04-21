import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';


@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.component.html',
  styleUrls: ['./tutoriales.component.scss'],
})
export class TutorialesComponent implements OnInit {
  
  tituloTutoriales = "Tutoriales";
  constructor( private youtube: YoutubeVideoPlayer) { }

  ngOnInit() {}

  watch(video: string){
      this.youtube.openVideo(video);
  }

}
