import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo = 'Por favor Sign In!';
  usuario: Usuario;
  constructor() { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
    }
  }

}
