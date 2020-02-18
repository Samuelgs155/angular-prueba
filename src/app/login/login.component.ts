import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuarios.model';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor( public router: Router, 
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm) {
    console.log('ingresando');
    console.log( forma.valid );
    //console.log( forma.value );
    //this.router.navigate(['/dashboard'])
    
    if(!forma.valid) {
      return;
    }
    console.log('ingresando2');
    let usuario = new Usuario("", forma.value.email, forma.value.password);
    console.log(usuario)
    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe( correcto => {
      //console.log(correcto);

      this.router.navigate(['/dashboard'])
    });

  }

}
