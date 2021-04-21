import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArchivosMultimediaService {

  constructor(public fireStorage: AngularFireStorage) { }

//  Codigo para enviar el archivo la ruta y el nombre para guardar la imagen en el storage
  uploadImage(file:any, path: string, nombre: string): Promise<string>{
    return new Promise( resolve => {
      const filePath = path + '/' + nombre;
      const ref = this.fireStorage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize( () => {
          ref.getDownloadURL().subscribe( res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      )
      .subscribe();
    });
  }
}
