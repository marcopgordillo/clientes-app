import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo = 'Por favor Sign In!';
  usuario: Usuario;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new Usuario();
    if (this.authService.isAuthenticated()) {
      swal('Login', `Hola ${this.authService.usuario.username} ya estás authenticado`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    // console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
    }

    this.authService.login(this.usuario).subscribe(
      response => {

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      const usuarioAuth = this.authService.usuario;

      this.router.navigate(['/clientes']);
      swal('Login', `Hola ${usuarioAuth.username}, has iniciado sesión con éxito!`, 'success');
    },
      error => {
        if (error.status == 400) {
          swal('Error Login', 'Usuario o Clave Incorrectas!', 'error');
        }
      });
  }

}
