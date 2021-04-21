import { Injectable, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { Cliente, Pedido } from './../models/insterfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { isNull } from 'util';



@Injectable({
  providedIn: 'root'
})
export class BasedeDatosService {

  user: Cliente;


  constructor(public FireStore: AngularFirestore,
              public FireAuth: AngularFireAuth) { }

  login(email: string, password: string){
   return this.FireAuth.signInWithEmailAndPassword(email, password);
    
  }     
  
  createUser(email:string, password: string){
    return this.FireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout(){
    this.FireAuth.signOut();
  }

  getUidState(){
    return this.FireAuth.authState;
  }

  async getUid(){
    const user = await this.FireAuth.currentUser;
    if (!isNull(user)){
      return user.uid;
    }
    return '';
  }

  createDocument<tipo>(data: tipo, enlace: string, id: string){
    const collecion = this.FireStore.collection<tipo>(enlace);
    return collecion.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string){
    const collection = this.FireStore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDocument<tipo>(enlace: string, id: string){
    const collecion = this.FireStore.collection<tipo>(enlace);
    return collecion.doc(id).delete();
  }
  
  updateDoc(data: any, path: string, id: string){
    const colleccion = this.FireStore.collection(path);
    return colleccion.doc(id).update(data);
  }

  createID(){
    return this.FireStore.createId();
  }
 
 
  ngOnInit() {}

  getCollectionChanges<tipo>(enlace: string): Observable<tipo[]>{
  const ref = this.FireStore.collection<tipo>(enlace);
  return ref.valueChanges(); 
  }

  setUser(users: Cliente){
    this.user = users;
  }

  getUser(){
    return this.user;
  }

 

  getCollectionQuery<tipo>(path: string, parametro:string, condicion: any, busqueda: string, starAt: any, items: number){
      if(starAt === null){
        starAt = new Date();
      }
      const collection = this.FireStore.collection<tipo>(path,
        ref => ref.where(parametro, condicion, busqueda)
                   .orderBy('FechaCreacion','desc')
                  .limit(items)
                  .startAfter(starAt)
        );
      return collection.valueChanges(); 
      }

      getCollectionQueryVendedor<tipo>(path: string, parametro:string, starAt: any ){
        if(starAt === null){
          starAt = new Date;
        }
        const collection = this.FireStore.collection<tipo>(path,
          ref => ref.where(parametro, 'in', ['Pendiente', 'Alistamiento','Preparado' ,'Enviado'])
                     .orderBy('fecha','desc')
                    .limit(4)
                    .startAfter(starAt)
          );
        return collection.valueChanges(); 
        }

        getCollectionQueryVendedorEntre<tipo>(path: string, parametro:string,condicion: any, busqueda: string , starAt: any ){
          if(starAt === null){
            starAt = new Date;
          }
          const collection = this.FireStore.collection<tipo>(path,
            ref => ref.where(parametro, condicion, busqueda)
                       .orderBy('fecha','desc')
                      .limit(4)
                      .startAfter(starAt)
            );
          return collection.valueChanges(); 
          }

}