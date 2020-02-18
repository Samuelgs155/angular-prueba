import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  constructor( public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {
    console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google) {
      this.usuario.email = usuario.email;
    }   
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen( archivo: File ) {

    if(!archivo) {
      this.imagenSubir = null;
      return;
    }
    console.log(archivo);
    this.imagenSubir = archivo;

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir,  this.usuario._id);
  }

}
