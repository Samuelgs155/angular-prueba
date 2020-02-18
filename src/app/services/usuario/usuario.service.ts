import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { HttpClient } from '@angular/common/http'; 
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  usuario: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    //console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  crearUsuario( usuario: Usuario ){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success')
        return resp.usuario;
      })
    );
    
    
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token=token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  login( usuario: Usuario , recordar: boolean = false) {

    if( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    
    return this.http.post(url, usuario).pipe(
      map(
        (resp: any) =>  {          
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
      }));
  }
}
