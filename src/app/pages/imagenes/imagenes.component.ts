import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {

  public imagenes = [] as any;

  public documentId = '';
  public currentStatus = 1;

  //DECLARAMOS EL FORMULARIO
  public imgForm = new FormGroup({
    descripcion: new FormControl('',Validators.required),
    url: new FormControl('',Validators.required),
    id: new FormControl('')
  });

  constructor(private imagenesService:ImagenesService) { 
    this.imgForm.setValue({
      id:'',
      descripcion:'',
      url: ''
    });


  }

  ngOnInit(): void {
    this.imagenesService.getImagenes().subscribe((imgSnapshot) => {
      this.imagenes=[];
      imgSnapshot.forEach((imgData:any) =>{
        this.imagenes.push({
          data: imgData.payload.doc.data(),
          id: imgData.payload.doc.id,
        })
      })
    })
  }

  //método para agregar una imagen nueva o actualizar una existencia
  public saveImagen(form:any,documentId = this.documentId){
    if(this.currentStatus == 1){
      let data = {
        descripcion : form.descripcion,
        url : form.url
      }
      this.imagenesService.crearImagen(data).then(() =>{
        this.imgForm.setValue({
          descripcion: '', url:'', id:''
        });
      },(error)=>{
        console.log(error);
      });
    } else {
      let data = {
        descripcion : form.descripcion,
        url : form.url
      }
      this.imagenesService.updateImagen(documentId,data).then(() =>{
        this.currentStatus = 1;
        this.imgForm.setValue({
          descripcion: '', url:'', id:''
        });
      },(error)=>{
        console.log(error);
      });
    }
  }

  //MÉTODO PARA QUE AL DARLE CLIC AL BOTÓN DE EDITAR, SE environmen
  //LOS DATOS AL FORM

  public editarImagen(documentId:string){
    let subscribe = this.imagenesService.getImagen(documentId).subscribe((img:any)=>{
      this.currentStatus = 2;
      this.documentId = documentId;
      this.imgForm.setValue({
        id:documentId,
        descripcion: img.payload.data()['descripcion'],
        url: img.payload.data()['url']
      });
      subscribe.unsubscribe();
    })
  }

  //MÉTODO PARA ELIMINAR UNA IMAGEN
  public deleteImagen(documentId:string){
    this.imagenesService.deleteImagen(documentId).then(() =>{
      console.log("Documento eliminado");
    },(error) => {
      console.log(error);
    });
  }

}
