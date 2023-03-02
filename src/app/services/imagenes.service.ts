import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private firestore:AngularFirestore) { }

  //MÉTODO PARA OBTENER LOS DOCUMENTOS
  getImagenes(){
    return this.firestore.collection('imagenes').snapshotChanges();
  }

  //MÉTODO PARA CREAR UN NUEVO DOCUMENTO
  crearImagen(data:{descripcion:string,url:string}){
    return this.firestore.collection('imagenes').add(data);
  }

  //MÉTODO PARA OBTENER UN SOLO DOC POR SU ID
  getImagen(documentId:string){
    return this.firestore.collection('imagenes').doc(documentId).snapshotChanges();
  }

  //MÉTODO PARA ACTUALIZAR UN DOCUMENTO
  updateImagen(documentId:string,data:any){
    return this.firestore.collection('imagenes').doc(documentId).set(data);
  }

  //MÉTODO PARA ELIMINAR UN DOC
  deleteImagen(documentId:string){
    return this.firestore.collection('imagenes').doc(documentId).delete();
  }

}
